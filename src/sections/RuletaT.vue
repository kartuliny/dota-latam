<template>
    <!-- <div class="ruleta" :style="{ backgroundImage: 'url(' + ruletaWallpaper + ')' }"> -->
    <div v-if="rouletteSettings?.enabled" class="ruleta">
        <div class="ruleta-background" :style="{ backgroundImage: 'url(' + ruletaWallpaper + ')' }"></div>
        <div class="summary">
            <h1 class="text-rojo-latam mt-30 mb-30">Dota 2 Latam</h1>
            <h1 class="mb-20">Ruleta</h1>
            <hr class="mb-32 w-10 d-inline-block">
            </hr>

            <p class="mb-40 text-blanco-latam fs-2">¡Un nuevo ítem te espera! Sube de nivel con <strong
                    class="text-legendario">Experiencia</strong> y obtén un ítem de Dota 2 de la ruleta.
            </p>

            <div class="d-grid">
                <template v-for="(roulette, index) in rouletteSettings.types">
                    <div class="skew"
                        v-if="roulette.enabled"
                        :class="{ active: ruletaTypeSelected == index, [`${skews[index].name}`]: true }"
                        @click="ruletaTypeSelected = index">
                        <i class="bi bi-lightning" :class="{ [`${skews[index].text}`]: true }"></i>
                        {{ roulette.name }}
                    </div>
                </template>
                <!-- 
                <div class="skew comun" :class="{ active: ruletaTypeSelected == 0 }" @click="ruletaTypeSelected = 0">
                    <i class="bi bi-lightning text-arcano"></i>
                    Normal
                </div>
                <div class="skew poco-comun" :class="{ active: ruletaTypeSelected == 1 }"
                    @click="ruletaTypeSelected = 1">
                    <i class="bi bi-lightning text-mitico"></i>
                    Tier 1
                </div>
                <div class="skew mitico" :class="{ active: ruletaTypeSelected == 2 }" @click="ruletaTypeSelected = 2">
                    <i class="bi bi-lightning text-legendario"></i>
                    Tier 2
                </div> -->
            </div>

        </div>
        <div v-if="!showResult" class="content">
            <div id="wrapper">
                <div v-for="(item, index) in currentItems.slice(0, 10)" :key="index" class="circle1"
                    :style="getCirclePosition(index)">
                    <div class="item">
                        <span class="title">{{ item.price }}</span>
                        <img :src="item.url" :class="getImageClasses(item, index)">
                        <span class="type" :class="`rarity-${item.rarity}`">{{ getRarityName(item.rarity) }}</span>

                    </div>
                </div>
                <div class="wrapper2">
                    <div v-for="(item, index) in currentItems.slice(10, 13)" :key="index + 10" class="circle2"
                        :style="getCircle2Position(index)">
                        <div class="item">
                            <span class="title">{{ item.price }}</span>
                            <img :src="item.url" :class="getImageClasses(item, index + 10)">
                            <span class="type" :class="`rarity-${item.rarity}`">{{ getRarityName(item.rarity)
                                }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn" @click="startSelection">{{ rouletteSettings.types![ruletaTypeSelected].xp }}</button>
        </div>

        <transition name="grow">
            <div v-if="showResult && selectedImage" class="content">
                <div class="text-center">
                    <h4 class="type mb-10" :class="`rarity-${selectedImage.rarity}`">{{
                        getRarityName(selectedImage.rarity)
                        }}</h4>
                    <img :src="selectedImage.url"
                        :class="{ 'grow-image': startGrowing, [`rarity-${selectedImage.rarity}`]: true }"
                        class="result-image d-flex mb-10" alt="Resultado final" />
                    <h4 class="title mb-10 text-center mb-20">{{ selectedImage.name }}</h4>
                    <h1 class="price text-arcano">S/ {{ selectedImage.price }}</h1>
                </div>
            </div>
        </transition>
    </div>
    <div class="h-100" v-else>
        <div class="d-flex w-100 h-100 justify-content-center align-items-center">
            <h1>NO DISPONIBLE</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import ruletaWallpaper from '@/assets/images/fondo-ruleta.webp';

export interface Image {
    rarity: number;
    name: string;
    url: string;
    weight: number;
    price: number;
}

import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { SettingsState, SettingsStateView, Tier } from './shared/store/setting/setting';
import { GetRouletteSettingUseCase } from '@/modules/admin/roulette/application/GetRouletteAdminSettingUseCase';
import { RouletteItemResponse } from '@/modules/admin/roulette/infrastructure/responses/RouletteAdminItemsResponse';
import { GetRouletteItemsUseCase } from '@/modules/admin/roulette/application/GetRouletteItemsUseCase';
import { RouletteItem } from '@/modules/admin/roulette/domain/models/RouletteAdminItem';

const highlightSound = new Audio('src/assets/play/tin-corto.mp3');
const winnerSound = new Audio('src/assets/play/fancy.wav');

// Definir las imágenes y sus probabilidades

const skews = [
    { name: 'comun', text: 'text-arcano' },
    { name: 'poco-comun', text: 'text-arcano' },
    { name: 'mitico', text: 'text-mitico' },
]

const items = ref<RouletteItemResponse>({
    type0Items: [],
    type1Items: [],
    type2Items: [],
});

const ruletaTypeSelected = ref<number>(0);
// Refs para almacenar el estado
const selectedImage = ref<RouletteItem | null>(null);
// const selectedImage = ref<Image>({ price: 12.90, rarity: 2, name: 'Imagen 13', url: 'https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcU4vBxaSV7eRvG5mMbeXlJmMQVbia2kOQtvwff3cjxS6ZO_mY2EheP1P4TGl3ld59d1terA5Ymkt1i1uRQ5fTz2LdKTJ1JvMFzW_gO9x-y80JO075TJwSRq7iEj5HvdnBO_hBlFb7RxxavJ_ytOH2c/330x192?allow_animated=1', weight: 0.05 });
const isAnimating = ref(false);
const currentIndex = ref<number | null>(null);
const circleWidth = 120;
const startGrowing = ref<boolean>(false);
const showResult = ref<boolean>(false);
const settings = ref<SettingsState>();
const rouletteSettings = ref<SettingsStateView>();

const getCirclePosition = (index: number) => {
    const offset = 100 - (circleWidth / 4)
    const div = 360 / 10;
    const radius = 260;
    const angle = div * index;
    const radians = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);

    return {
        top: `${y + offset}px`,
        left: `${x + offset}px`,
    };
};

const getCircle2Position = (index: number) => {
    const offset = 100 - (circleWidth / 4)
    const div = 360 / 3;
    const radius = 100;
    const angle = div * index;
    const radians = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);

    return {
        top: `${y + offset}px`,
        left: `${x + offset}px`,
    };
};

const getRandomImage = () => {
    // selectedImage.value = null; // Reiniciar la imagen seleccionada
    const totalWeight = currentItems.value.reduce((acc, image) => acc + (image.probability ?? 0), 0);
    const randomNum = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < currentItems.value.length; i++) {
        cumulativeWeight += currentItems.value[i].probability ?? 0;
        if (randomNum < cumulativeWeight) {
            return i; // Retornamos el índice de la imagen seleccionada
        }
    }
    return currentItems.value.length - 1; // Debería devolver algo en caso de error
};
const startSelection = async () => {
    // Seleccionar la imagen ganadora aleatoriamente antes de comenzar la animación
    const selectedIndex = getRandomImage();
    // selectedImage.value = images[selectedIndex];

    isAnimating.value = true;
    currentIndex.value = null; // Resetear el índice actual para comenzar la animación

    const totalFlashes = 25; // Número total de destellos
    let flashDuration = 20; // Duración inicial (muy rápida, en milisegundos)
    const maxDuration = 400; // Duración máxima (lenta al final)
    const accelerationFactor = 1.2; // Incremento progresivo de la duración

    // Durante la animación, se irá mostrando la imagen ganadora (seleccionada previamente)
    for (let i = 0; i < totalFlashes; i++) {
        // Seleccionar un índice aleatorio para cada destello
        currentIndex.value = Math.floor(Math.random() * currentItems.value.length);

        // Esperar por la duración actual antes de continuar
        await new Promise((resolve) => setTimeout(resolve, flashDuration));

        // Incrementar la duración del siguiente destello (desacelerar)
        flashDuration = Math.min(flashDuration * accelerationFactor, maxDuration);
    }

    // Después de la animación, la imagen seleccionada ya está disponible en selectedImage
    selectedImage.value = currentItems.value[selectedIndex];
    // Detener la animación
    isAnimating.value = false;

    setTimeout(() => {
        winnerSound.play();
        showResult.value = true;
        nextTick(() => {
            startGrowing.value = true;
        });
    }, 500);
};

const getImageClasses = (image: RouletteItem, index: number): { [key: string]: boolean } => {
    return {
        // [`rarity-${image.rarity}`]: true, // Clase de rareza
        'highlight': isAnimating.value && currentIndex.value === index, // Clase condicional para highlight
        'selected': selectedImage && selectedImage.value?.name === currentItems.value[index].name, // Clase condicional para selected
    };
};

const getRarityName = (rarityNumber: number): string => {
    switch (rarityNumber) {
        case 0:
            return 'Común';
        case 1:
            return 'Poco común';
        case 2:
            return 'Raro';
        case 3:
            return 'Mítico';
        case 4:
            return 'Legendario';
        case 5:
            return 'Inmortal';
        case 6:
            return 'Arcano';
        default:
            return 'Desconocido';
    }
};

watch(currentIndex, (newIndex) => {
    if (newIndex !== null && isAnimating.value) {
        highlightSound.currentTime = 0;
        highlightSound.play();
    }
});

const getSettings = async () => {
    const response = await GetRouletteSettingUseCase.invoke();
    settings.value = response.settings

    const responseItems = await GetRouletteItemsUseCase.invoke();
    console.log(responseItems)
    const probabilities = response.settings.types?.tier_1.probabilities;

    const items0Length = responseItems.type0Items.length;

    const items0: RouletteItem[] = responseItems.type0Items.map((item) => {
        return {
            ...item,
            probability: probabilities ? probabilities[3]/ items0Length : 0,
        }
    });

    
    const items1: RouletteItem[] = responseItems.type1Items.map((item) => {
        return {
            ...item,
            probability: probabilities ? probabilities[2]/ items0Length : 0,
        }
    });
    
    const items2: RouletteItem[] = responseItems.type2Items.map((item) => {
        return {
            ...item,
            probability: probabilities ? probabilities[1]/ items0Length : 0,
        }
    });

    items.value = {
        type0Items: items0,
        type1Items: items1,
        type2Items: items2,
    };

    const types: Tier[] = Object.entries(settings.value!.types!).map(([key, value]) => ({
        key,
        ...value,
    }));

    rouletteSettings.value = { ...settings.value, types }
};

const currentItems = computed(() => {
    if (!items.value || typeof items.value !== 'object') return [];
    return [
        ...(items.value.type0Items || []),
        ...(items.value.type1Items || []),
        ...(items.value.type2Items || []),
    ];
});


onMounted(() => {
    getSettings();
});
</script>

<style lang="scss" scoped>
button {
    width: 200px;
    height: 50px;
    background-color: #3498db;
    color: white;
    border: none;

}

.ruleta {
    padding-top: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    object-fit: fill;
    background-repeat: no-repeat;

    &-background {
        position: absolute;
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

.summary {
    position: relative;
    width: 400px;
    text-align: center;
    margin: 0 auto;
}

.content {
    position: relative;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-evenly;
}

.highlight {
    border: 2px solid #ffcc00 !important;
}

.selected {
    border: 2px solid #00ff00;
}

#wrapper {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 150px auto;
    animation: rotateBackWrapper 30s linear infinite;
}

@keyframes rotateWrapper {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes rotateBackWrapper {
    from {
        transform: rotate(360deg);
    }

    to {
        transform: rotate(0deg);
    }
}

.circle1 {
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 25%;
    transform: translate(-25%, -25%);

    .item {
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 25%;
        animation: rotateWrapper 30s linear infinite;

        img {
            width: 100%;
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
            width: 96%;
            top: 48%;
            left: 0;
            right: 0;
            margin: 0 auto;
        }
    }
}

.circle2 {
    position: absolute;
    width: 120px;
    height: 120px;
    // background-color: purple;
    border-radius: 25%;
    transform: translate(-25%, -25%);

    .item {
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 25%;
        animation: rotateBackWrapper 30s linear infinite;

        img {
            width: 100%;
            // height: 100%;
            object-fit: cover;
            border-radius: 0%;
            position: absolute;
            background: linear-gradient(to bottom, #747474 50%, #9c04ba 50%);
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
            top: 48%;
            left: 0;
            right: 0;
            margin: 0 auto;
        }
    }
}

.wrapper2 {
    transform: rotate(90deg);
    /* top: -150px; */
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    /* margin: 150px auto; */
    /* background-color: orange; */
    animation: rotateWrapper 15s linear infinite;
}


/* Animación de rebote para la imagen cuando se elimina (se va) */
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

/* Añadimos la animación de rebote */
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

    // .type {
    //     font-weight: 600;

    //     &.rarity {
    //         &-0 {
    //             color: var(--comun);
    //         }

    //         &-1 {
    //             color: var(--poco-comun);
    //         }

    //         &-2 {
    //             color: var(--raro);
    //         }

    //         &-3 {
    //             color: var(--mitico);
    //         }

    //         &-4 {
    //             color: var(--legendario);
    //         }

    //         &-5 {
    //             color: var(--inmortal);
    //         }

    //         &-6 {
    //             color: var(--arcano);
    //         }
    //     }
    // }
}

.type,
.price {
    font-weight: 600;

    &.rarity {
        &-0 {
            color: var(--comun);
        }

        &-1 {
            color: var(--poco-comun);
        }

        &-2 {
            color: var(--raro);
        }

        &-3 {
            color: var(--mitico);
        }

        &-4 {
            color: var(--legendario);
        }

        &-5 {
            color: var(--inmortal);
        }

        &-6 {
            color: var(--arcano);
        }
    }
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
</style>
