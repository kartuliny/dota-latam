<script setup lang="ts">
import { LogoutUseCase } from '@/modules/shared/user/application/user/LogoutUseCase';
import { getRarityName } from '@/utils/format/items';
import { formatNumber } from '@/utils/format/numbers';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSocketStore } from '../store/socket/socket';
import { useSettingStore } from '../store/setting/setting';

const router = useRouter();
const route = useRoute();
const socketStore = useSocketStore();
const settingStore = useSettingStore();

const rouletteWinners = computed(() => socketStore.rouletteWinners);
const userData = computed(() => socketStore.userData);
const hideNavbar = ref<boolean>(true);

const pages = [
    { name: 'Inicio', path: '/', icon: 'bi bi-house-fill' },
    { name: 'Tienda', path: '/store', icon: 'bi bi-basket2-fill' },
    { name: 'XP', path: '/xp', icon: 'bi bi-trophy-fill' },
    { name: 'Ruleta', path: '/ruleta', icon: 'bi bi-bullseye' },
    { name: 'Boosting', path: '/boosting', icon: 'bi bi-patch-check-fill' },
    { name: 'Eventos', path: '/events', icon: 'bi bi-calendar-event-fill' },
];

const scrollState = reactive({
    lastScrollY: 0,
    isNavbarVisible: true,
    hideThreshold: 80,
    currentOffset: 0,
});

const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollState.lastScrollY) {
        scrollState.currentOffset += currentScrollY - scrollState.lastScrollY; // Desplazamiento hacia abajo
    } else {
        scrollState.currentOffset -= scrollState.lastScrollY - currentScrollY; // Desplazamiento hacia arriba
    }

    scrollState.currentOffset = Math.max(0, Math.min(scrollState.currentOffset, scrollState.hideThreshold));
    scrollState.isNavbarVisible = scrollState.currentOffset < scrollState.hideThreshold;
    scrollState.lastScrollY = currentScrollY;
};

const isActive = (path: string) => {
    return route.path.startsWith(path) &&
        pages.every(p => !route.path.startsWith(p.path) || path.length >= p.path.length);
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);

});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

const goToPage = (path: string) => {
    hideNavbar.value = true;
    router.push(path);
}

const dropdownOpen = ref(false);
const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};
const closeDropdown = () => {
    dropdownOpen.value = false;
};

const logout = async () => {
    try {
        hideNavbar.value = true
        await LogoutUseCase.invoke();
        localStorage.removeItem('token');
        router.push({ name: 'signin' });
    } catch (error) {
        console.error(error);
    }
};

</script>

<template>
    <div class="w-full">
        <nav class="navbar" :class="{ hidden: !scrollState.isNavbarVisible }">
            <div class="lg:d-none position-relative w-full d-flex justify-space-between px-24">
                <h2>Dota 2 Latam</h2>
                <i class="hamburger pointer fs-1 bi" :class="[{ 'bi-list': hideNavbar, 'bi-x': !hideNavbar }]"
                    @click="hideNavbar = !hideNavbar"></i>
            </div>
            <img class="logo" src="@/assets/images/logo_final.webp" width="70" alt="Dota 2">
            <ul :class="{ hidden: hideNavbar || !scrollState.isNavbarVisible }">
                <div v-if="userData.username" class="lg:d-none position-relative d-flex px-32 pt-10 mb-32 align-center">
                    <img class="w-8" :src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`"
                        alt="profile">
                    <h4 class="username ml-8 mr-20">{{ userData.displayName }}</h4>

                    {{ formatNumber(Number(userData.xp)) }} <span class="text-amarillo-latam strong ml-8">EXP</span>

                </div>
                <li v-for="page in pages" :class="{ active: isActive(page.path) }" @click="goToPage(page.path)">
                    <i :class="page.icon" class="mr-4"></i>
                    {{ page.name }}
                </li>
                <template v-if="userData.username">
                    <li class="lg:d-none" @click="settingStore.toggleShowSteamTradeModal(); hideNavbar = true">
                        Steam trade URL
                    </li>
                    <li class="lg:d-none" @click="logout">
                        Cerrar sesión
                    </li>
                </template>

            </ul>
            <transition name="fade">
                <div class="profile">
                    <template v-if="userData.username">
                        <div class="pointer d-flex justify-center align-center" @click="toggleDropdown">
                            <h5 class="fs-4" style="min-width: 180px;text-align: right; padding-right: 20px;">
                                {{ formatNumber(Number(userData.xp)) }}
                                <span class="text-amarillo-latam strong">EXP</span>
                            </h5>
                            <img class="avatar"
                                :src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`"
                                alt="profile">
                            <h4 class="username">{{ userData.displayName }}</h4>
                            <i class="fs-6 ml-4 bi bi-caret-down-fill" :class="{ 'rotate-180': dropdownOpen }"></i>
                        </div>
                        <div class="dropdown" :class="{ 'active': dropdownOpen }" @mouseleave="closeDropdown">
                            <a href="#" class="dropdown-link">Perfil</a>
                            <a href="#" @click="settingStore.toggleShowSteamTradeModal()" class="dropdown-link">Steam
                                trade URL</a>
                            <a href="#" class="dropdown-link" @click="logout">Cerrar sesión</a>
                        </div>
                    </template>
                </div>
            </transition>
        </nav>
        <transition name="fade">
            <div class="prizes" :class="{ top0: scrollState.isNavbarVisible }">
                <div class="prize position-relative ml-100" v-for="(winner) in rouletteWinners"
                    v-if="rouletteWinners.length">
                    <div class="d-flex align-center">
                        <div>
                            <span class="fs-6 bold username mr-10">{{ winner.user.displayName }}</span>
                            <i class="bi bi-chevron-double-right mr-10 text-amarillo-latam"></i>
                        </div>
                        <div>
                            <div class="item">
                                <!-- <span class="title">{{ winner.item.price }}</span> -->
                                <img :src="winner.item.url">
                                <span class="type" :class="`rarity-${winner.item.rarity}`">{{
                                    getRarityName(winner.item.rarity)
                                    }}</span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <router-view />
    </div>
</template>
<style lang="scss" scoped>
@use '@/assets/scss/utils' as *;

.prizes {
    display: flex;
    align-items: center;
    width: 100%;
    position: fixed;
    z-index: 99;
    left: 0;
    color: white;
    height: 60px;
    overflow: hidden;
    /* Evita que se vea fuera del contenedor */
    transition: transform 0.5s ease, opacity 0.5s ease;

    @include breakpoints("lg") {
        height: 80px;
    }

    &.top0 {
        transform: translateY(100%);
    }

    &::before {
        -webkit-backdrop-filter: blur(7.5px);
        backdrop-filter: blur(7.5px);
        background: var(--roulette-prizes-background);
        content: "";
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }

    /* Estilo para el prize que se mueve */
    .prize {
        min-width: 200px;
        position: relative;
        display: flex;
        align-items: center;
        white-space: nowrap;
        height: 100%;
        animation: slideLeft 30s linear infinite;
    }

    @keyframes slideLeft {
        from {
            transform: translateX(calc(100vw + 300px));
            /* Empieza fuera del contenedor (100vw + tamaño del premio) */
        }

        to {
            transform: translateX(calc(-100vw - 300px));
            /* Termina fuera del contenedor */
        }
    }
}

i {
    &.rotate-180::before {
        transform: rotate(180deg);
        transition: transform 0.3s ease;
    }

    &::before {
        transition: transform 0.3s ease;
    }
}

.item {
    position: absolute;
    height: 76px;
    width: 76px;
    border-radius: 25%;
    top: 2px;
    animation: rotateWrapper 30s linear infinite;

    img {
        width: 75px;
        height: 75px;
        object-fit: cover;
        border-radius: 0%;
        position: absolute;
        background: linear-gradient(to bottom, #747474 50%, #747474 50%);
    }

    .title {
        background: rgba(0, 0, 0, 0.7);
        line-height: 0.3;
        padding-top: 8px;
        text-align: center;
        position: absolute;
        z-index: 100;
        padding-bottom: 10px;
        width: 100%;
        font-size: 12px;
        font-weight: 900;
        color: white;
        top: 67%;
    }

    .type {
        background: rgba(0, 0, 0, 0.7);
        line-height: 0.3;
        padding-top: 8px;
        padding-bottom: 10px;
        text-align: center;
        position: absolute;
        z-index: 100;
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
}
</style>