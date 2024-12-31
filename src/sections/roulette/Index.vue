<script setup lang="ts">
import ruletaWallpaper from '@/assets/images/fondo-ruleta.webp';
import { onMounted, ref } from 'vue';
import Roulette from '../shared/look/Roulette/Index.vue';
import { SettingsState, SettingsStateView, Tier, useSettingStore } from '../shared/store/setting/setting';
import { GetRouletteSettingUseCase } from '@/modules/roulette/application/GetRouletteSettingUseCase';
import { GetRouletteItemsUseCase } from '@/modules/roulette/application/GetRouletteItemsUseCase';
import { RouletteItem } from '@/modules/roulette/domain/models/RouletteItem';
import { RouletteItemsResponse } from '@/modules/roulette/infrastructure/responses/RouletteItemsResponse';
import { useRouter } from 'vue-router';
import { formatNumber } from '@/utils/format/numbers';
import { RunRouletteUseCase } from '@/modules/roulette/application/RunRouletteUseCase';
import Confetti from './Confetti.vue';
import { getRarityName } from '@/utils/format/items';
import SteamTradeModal from './SteamTradeModal.vue';
import { useSocketStore } from '../shared/store/socket/socket';

const router = useRouter();
const ruletaTypeSelected = ref<number>(0);
const tiers = ref<RouletteItemsResponse>({
    type0Items: [],
    type1Items: [],
    type2Items: [],
});

const socketStore = useSocketStore();
const setingStore = useSettingStore()
const items = ref<RouletteItem[]>([]);
const showConfetti = ref<boolean>(false);
const settings = ref<SettingsState>();
const rouletteSettings = ref<SettingsStateView>();
const loadingSection = ref<boolean>(false);

const start = ref<boolean>(false);
const indexSelected = ref<number>(0);
const rouletteItemWinner = ref<RouletteItem | null>(null);
const startGrowing = ref<boolean>(false);
const selectedImage = ref<RouletteItem | null>(null);
const skews = [
    { name: 'comun', text: 'text-arcano' },
    { name: 'poco-comun', text: 'text-arcano' },
    { name: 'mitico', text: 'text-mitico' },
]

const getSettings = async () => {
    loadingSection.value = true;
    try {
        const response = await GetRouletteSettingUseCase.invoke();
        settings.value = response.settings

        const responseItems = await GetRouletteItemsUseCase.invoke();
        tiers.value = {
            type0Items: responseItems.type0Items,
            type1Items: responseItems.type1Items,
            type2Items: responseItems.type2Items,
        };

        const types: Tier[] = Object.entries(settings.value!.types!).map(([key, value]) => ({
            key,
            ...value,
        }));

        rouletteSettings.value = { ...settings.value, types }
        loadingSection.value = false;
        setingStore.showSteamTradeModal = !socketStore.userData.tradeUrl;
    } catch (error: any) {
        loadingSection.value = false;
    }
};

const getImageClasses = (index: number): { [key: string]: boolean } => {
    return {
        'selected': selectedImage && selectedImage.value?._id === tiers.value.type2Items[index]._id, // Clase condicional para selected
    };
};

const changeStart = async (value: boolean) => {
    start.value = value;
    // if (value) {
    //     const response = await RunRouletteUseCase.invoke({
    //         tierName: rouletteSettings.value!.types![ruletaTypeSelected.value].key,
    //         grantItemId: selectedImage.value?._id,
    //     })

    //     indexSelected.value = response.itemIndexSelected;
    //     items.value = response.items;
    //     start.value = value;
    // }
};

const run = async () => {
    const response = await RunRouletteUseCase.invoke({
        tierName: rouletteSettings.value!.types![ruletaTypeSelected.value].key,
        grantItemId: selectedImage.value?._id,
    })

    indexSelected.value = response.itemIndexSelected;
    items.value = response.items;
    start.value = true;
}

const done = () => {
    if (items.value) {
        rouletteItemWinner.value = items.value[indexSelected.value];
        items.value = [];
        console.log('done');
        showConfetti.value = true;
    }
}

const removeConfetti = () => {
    showConfetti.value = false;
    rouletteItemWinner.value = null;
    startGrowing.value = false;
}

onMounted(() => {
    getSettings();
});

</script>

<template>
    <SteamTradeModal v-if="setingStore.showSteamTradeModal"></SteamTradeModal>
    <Confetti v-if="showConfetti">
        <transition name="grow">
            <div v-if="rouletteItemWinner" class="content">
                <div class="text-center">
                    <h4 class="type mb-10" :class="`rarity-${rouletteItemWinner.rarity}`">{{
                        getRarityName(rouletteItemWinner.rarity)
                    }}</h4>
                    <img :src="rouletteItemWinner.url"
                        :class="{ 'grow-image': startGrowing, [`rarity-${rouletteItemWinner.rarity}`]: true }"
                        class="mx-auto result-image d-flex mb-10" alt="Resultado final" />
                    <h4 class="title mb-10 text-center mb-20">{{ rouletteItemWinner.name }}</h4>
                    <h1 class="price text-arcano mb-32">S/ {{ rouletteItemWinner.price }}</h1>
                    <button @click="removeConfetti" class="btn submit  w-full">Aceptar</button>
                </div>
            </div>
        </transition>
    </Confetti>
    <!-- <div class="ruleta" :style="{ backgroundImagebackgroundImage: 'url(' + ruletaWallpaper + ')' }"> -->
    <div v-if="loadingSection" class="h-100 w-full" v-loading="loadingSection"></div>
    <template v-else>
        <div v-if="!rouletteSettings" class="ruleta">
            <div class="ruleta-background" :style="{ backgroundImage: 'url(' + ruletaWallpaper + ')' }"></div>
            <div class="position-relative d-flex w-full h-100 justify-center align-center">
                <div class="text-center">
                    <h1 class="mb-20">Ruleta disponible solo</h1>
                    <h1 class="mb-20">para miembros del Discord</h1>
                    <button class="btn btn submit" @click="router.push({ name: 'signin' })">Ingresar</button>
                </div>
            </div>
        </div>
        <div v-else-if="rouletteSettings?.enabled" class="ruleta">
            <div class="ruleta-background" :style="{ backgroundImage: 'url(' + ruletaWallpaper + ')' }"></div>
            <div class="position-relative w-10/12 mx-auto mt-100" style="max-width: 1000px;">
                <div class="d-block w-full md:d-flex md:justify-space-between mb-40">
                    <div class="mb-20 text-center w-full md:w-2/5 md:text-left md:mb-0">
                        <h1 class="text-rojo-latam mb-20">Dota 2 Latam</h1>
                        <h1 class="mb-20">Ruleta</h1>
                        <hr class="mb-20 w-10 d-inline-block">
                        </hr>

                        <p class="mb-20 text-blanco-latam fs-2">¡Un nuevo ítem te espera! Sube de nivel con <strong
                                class="text-legendario">Experiencia</strong> y obtén un ítem de Dota 2 de la ruleta.
                        </p>

                        <div class="d-grid">
                            <template v-for="(roulette, index) in rouletteSettings.types">
                                <div class="skew" v-if="roulette.enabled"
                                    :class="{ active: ruletaTypeSelected == index, [`${skews[index].name}`]: true }"
                                    @click="ruletaTypeSelected = index">
                                    <i class="bi bi-lightning" :class="{ [`${skews[index].text}`]: true }"></i>
                                    {{ roulette.name }}
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="text-center w-full md:w-2/5 md:text-left">
                        <div>
                            <h1 class="mb-12 text-center" :class="{ [`${skews[ruletaTypeSelected].text}`]: true }">{{
                                rouletteSettings.types![ruletaTypeSelected].name
                                }}</h1>
                            <p class="mb-20 text-blanco-latam fs-2 text-center">¡Elige premio mayor!</p>

                            <div class="d-grid grid-template-1-1-1-1">
                                <template v-for="(item, index) in tiers.type2Items" :key="index">
                                    <div>
                                        <div class="item" @click="selectedImage = item">
                                            <!-- <span class="title">{{ item.price }}</span> -->
                                            <img :src="item.url" :class="getImageClasses(index)">
                                            <span class="type" :class="`rarity-${item.rarity}`">{{
                                                getRarityName(item.rarity)
                                                }}</span>

                                        </div>
                                    </div>
                                </template>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="w-full d-flex justify-center">
                    <Roulette :start="start" @run="run" @start="changeStart"
                        :buttonText="'Girar por ' + formatNumber(rouletteSettings.types![ruletaTypeSelected].xp)"
                        :prizes="items" :index="indexSelected + 40" @done="done">
                    </Roulette>
                </div>
            </div>

            <div class="position-relative w-3/4 mx-auto" style="max-width: 1000px;">
                <div class="d-flex w-full justify-space-between">
                    <div class="w-1/3 mr-20">
                        <div>
                            <h3 class="mb-20 text-center lh-3">Categoría 1</h3>
                            <hr class="mb-20">
                        </div>
                        <div class="sm:d-block md:d-grid gap-05 w-full lg:grid-cols-2">
                            <template v-for="(item) in tiers.type0Items" :key="index">
                                <div class="position-relative">
                                    <div class="item">
                                        <!-- <span class="title">{{ item.price }}</span> -->
                                        <img :src="item.url">
                                        <span class="type" :class="`rarity-${item.rarity}`">{{
                                            getRarityName(item.rarity)
                                            }}</span>

                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="w-1/3 mr-20">
                        <div>
                            <h3 class="mb-20 text-center lh-3">Categoría 2</h3>
                            <hr class="mb-20">
                        </div>
                        <div class="d-grid gap-05 w-full lg:grid-cols-2">
                            <template v-for="(item) in tiers.type1Items" :key="index">
                                <div class="position-relative">
                                    <div class="item">
                                        <!-- <span class="title">{{ item.price }}</span> -->
                                        <img :src="item.url">
                                        <span class="type" :class="`rarity-${item.rarity}`">{{
                                            getRarityName(item.rarity)
                                            }}</span>

                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="w-1/3">
                        <div>
                            <h3 class="mb-20 text-center lh-3">Categoría 3</h3>
                            <hr class="mb-20">
                        </div>
                        <div class="d-grid gap-05 w-full lg:grid-cols-2">
                            <template v-for="(item) in tiers.type2Items" :key="index">
                                <div class="position-relative">
                                    <div class="item">
                                        <!-- <span class="title">{{ item.price }}</span> -->
                                        <img :src="item.url">
                                        <span class="type" :class="`rarity-${item.rarity}`">{{
                                            getRarityName(item.rarity)
                                            }}</span>

                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="h-100" v-else>
            <div class="d-flex w-full h-100 justify-center align-center">
                <h1>NO DISPONIBLE</h1>
            </div>
        </div>
    </template>
</template>

<style lang="scss" scoped>
.selected {
    border: 2px solid #00ff00;
}

.summary {
    position: relative;
    width: 400px;
    text-align: center;
    margin: 0 auto;
}

.content {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-evenly;
    z-index: 9999;
}

.ruleta {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    object-fit: fill;
    background-repeat: no-repeat;
    height: 100%;

    &-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;

        object-fit: cover;
        opacity: 0.25;
        background-repeat: no-repeat;
        background: radial-gradient(circle, #515151, #2a2a2a, #000000);
        background-size: cover;
    }
}

.grow-leave-active {
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-in;
}

.grow-leave-from {
    transform: scale(1);
    opacity: 1;
}

.grow-leave-to {
    transform: scale(0);
    /* Se reduce el tamaño */
    opacity: 0;
}


@keyframes bounce {
    0% {
        transform: scale(1);
    }

    30% {
        transform: scale(1.2);
    }

    50% {
        transform: scale(0.8);
    }

    70% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.grow-image {
    transition: transform 0.5s ease-in-out;
    transform: scale(1);
    animation: bounce 0.6s ease forwards;
}

.item {
    img {
        &.rarity {
            &-0 {
                border: 1px solid var(--comun);
            }

            &-1 {
                border: 1px solid var(--poco-comun);
            }

            &-2 {
                border: 1px solid var(--raro);
            }

            &-3 {
                border: 1px solid var(--mitico);
            }

            &-4 {
                border: 1px solid var(--legendario);
            }

            &-5 {
                border: 1px solid var(--inmortal);
            }

            &-6 {
                border: 1px solid var(--arcano);
            }
        }
    }
}

.type,
.price {
    font-weight: 600;
}

.skew {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 140px;
    height: 45px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    z-index: 1;
    cursor: pointer;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
        border-radius: 10px;
        transform: skewX(-15deg);
    }

    &.active {
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: -1;
            margin: -5px;
            border-radius: 15px;
            transform: skewX(-15deg);
            border: 2px solid var(--arcano);
        }
    }

    &.comun {
        &::before {
            background: var(--gris-latam-plus-60);
        }
    }

    &.poco-comun {
        &::before {
            background: linear-gradient(225deg, var(--arcano-plus-40) 0%, var(--raro-plus-60) 45%, var(--raro) 100%);
        }
    }

    &.mitico {
        &::before {
            background: linear-gradient(225deg, var(--legendario-plus-60) 0%, var(--mitico-plus-20) 65%, var(--mitico-minus-20) 100%);
        }
    }
}


.item {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 140px;
    border-radius: 25%;
    cursor: pointer;

    img {
        width: 100%;
        object-fit: cover;
        border-radius: 0%;
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
        width: 96%;
        bottom: 5px;
        right: 0;
        left: 0;
        margin: 0 auto;
    }
}
</style>