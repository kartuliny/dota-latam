<script setup lang="ts">
import { LogoutUseCase } from '@/modules/shared/user/application/user/LogoutUseCase';
import { getRarityName } from '@/utils/format/items';
import { formatNumber } from '@/utils/format/numbers';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSocketStore } from '../store/socket/socket';

const router = useRouter();
const route = useRoute();
const socketStore = useSocketStore();

const rouletteWinners = computed(() => socketStore.rouletteWinners);
const userData = computed(() => socketStore.userData);
const userProfile = computed(() => socketStore.userProfile);
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

const onProfile = () => {
    hideNavbar.value = true;
    router.push({ name: 'profile' });
};

const onRecharge = () => {
    hideNavbar.value = true;
    router.push({ name: 'recharge' });
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
            <img class="logo" :src="$staticUrl + '/images/logo_final.webp'" width="70" alt="Dota 2">
            <ul :class="{ hidden: hideNavbar || !scrollState.isNavbarVisible }">
                <div v-if="userData.username" class="lg:d-none position-relative d-flex align-center justify-evenly">

                    <div>
                        <div class="text-center">{{ formatNumber(Number(userData.xp)) }} </div><span
                            class="text-amarillo-latam strong d-block text-center">EXP</span>
                    </div>

                    <div>
                        <div class="text-center d-flex align-center justify-center">{{ userProfile.coins || 0 }} <img class="ml-4" width="16" height="16" :src="$staticUrl + '/images/latam-coin.webp'" alt="latamcoin"></div><span class="text-amarillo-latam strong">LATAMCOIN</span>
                    </div>

                    <div>
                        <img class="w-10 rounded-full d-block"
                            :src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`"
                            alt="profile">
                        <!-- <h5 class="username text-center">{{ userData.displayName }}</h5> -->
                    </div>
                </div>
                <template v-if="userData.username">
                    <li class="lg:d-none" @click="onProfile">
                        Mi perfil
                    </li>
                </template>
                <li v-for="page in pages" :class="{ active: isActive(page.path) }" @click="goToPage(page.path)">
                    <i :class="page.icon" class="mr-4"></i>
                    {{ page.name }}
                </li>
                <template v-if="userData.username">
                    <li class="lg:d-none" @click="logout">
                        Cerrar sesión
                    </li>
                </template>

            </ul>
            <transition name="fade">
                <div class="profile">
                    <template v-if="userData.username">
                        <div class="pointer d-flex justify-space-between align-center w-full" @click="toggleDropdown">
                            <div class="d-flex">
                                <div>
                                    <div class="text-center fs-5">{{ formatNumber(Number(userData.xp)) }} </div><span
                                        class="text-amarillo-latam strong d-block text-center">EXP</span>
                                </div>

                                <div class="ml-32">
                                    <div class="text-center fs-5 d-flex align-center justify-center">{{ userProfile.coins || 0 }} <img class="ml-4" width="16" height="16" :src="$staticUrl + '/images/latam-coin.webp'" alt="latamcoin"></div><span
                                        class="text-amarillo-latam strong">LATAMCOIN</span>
                                </div>
                            </div>
                            <div class="d-flex align-center">
                                <img class="avatar"
                                    :src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`"
                                    alt="profile">
                                <h4 class="username">{{ userData.displayName }}</h4>
                                <i class="fs-6 ml-4 bi bi-caret-down-fill" :class="{ 'rotate-180': dropdownOpen }"></i>
                            </div>
                        </div>
                        <div class="dropdown text-center" :class="{ 'active': dropdownOpen }"
                            @mouseleave="closeDropdown">
                            <a href="#" @click="onProfile" class="dropdown-link">Mi perfil</a>
                            <a href="#" @click="onRecharge" class="dropdown-link">Recargar</a>
                            <a href="#" class="dropdown-link" @click="logout">Cerrar sesión</a>
                        </div>
                    </template>
                </div>
            </transition>
        </nav>
        <transition name="fade" style="display: none;">
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
        <div class="d-flex">
            <div class="w-full">
                <router-view />
            </div>
            <!-- <div class="w-max">
                <div class="bg-black position-relative mt-100">
                    <div class="item">
                        <img src="https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcUxpg5PRUnCCOeiwt3aVk9LMQ0O-bmqPhVp1uH3ZTQb09CgmNHElPjhIbLUhFRF4ZxOhv_NpLP5iUazrl04NTr3coWUJlRsZFzR-wC9ybjohJDv7s_BwHtj6CFx7SuIlxK-gxpJcKUx0mAxTusH/330x192?allow_animated=1">
                        <span class="type" :class="`rarity-0`">{{
                            getRarityName(0)
                        }}</span>

                    </div>
                </div>
            </div> -->
        </div>
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