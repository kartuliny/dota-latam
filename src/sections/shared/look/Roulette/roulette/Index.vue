<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, toRef, watch } from 'vue';
import RegularDesign from '../design/Regular/RegularDesign.vue';
import { RouletteOrientation, RouletteProProps } from './Roulette.d';
import classNames from './classes';

const props = defineProps<RouletteProProps>()
const emits = defineEmits(['onPrizeDefined']);
const type = toRef(props, 'type');
const start = toRef(props, 'start');

const prizeItemHeightWithoutText = computed<number>(() =>
    props.type === RouletteOrientation.vertical ? 172 : 174
);

const prizeItemHeight = computed<number>(() =>
    props.defaultDesignOptions.prizesWithText ? 234 : prizeItemHeightWithoutText.value
);

const prizeItemClassName = computed(() =>
    `roulette-pro-regular-design-prize-item-${props.type}`
);

const design = reactive({
    prizeItemWidth: 205,
    prizeItemHeightWithoutText: prizeItemHeightWithoutText.value,
    prizeItemHeight: prizeItemHeight.value,
    bottomChildren: null,
    prizeItemClassName: prizeItemClassName.value,
})


const wrapperSize = ref<number>(0)
const wrapperRef = ref<HTMLDivElement | null>(null);
const sound = new Audio('src/assets/play/audio-carusel.mp3');
const soundWinner = new Audio('src/assets/play/fancy.wav');


// const { prizeItemWidth, prizeItemHeight } = design;

const setCurrentWrapperWidth = () => {
    const { width, height } = (wrapperRef.value as HTMLDivElement).getBoundingClientRect();

    switch (props.type) {
        case RouletteOrientation.horizontal:
            return wrapperSize.value = width;

        case RouletteOrientation.vertical:
            return wrapperSize.value = height;

        default:
            console.error(`Unknown roulette type ${props.type}`);
    }
};

onMounted(() => {
    setCurrentWrapperWidth();

    window.addEventListener('resize', setCurrentWrapperWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', setCurrentWrapperWidth);
});

watch(type, () => {
    setCurrentWrapperWidth();
});


watch(start, () => {
    console.log("start", start.value);
    if (!start.value) {
        return;
    }
    sound.currentTime = 1.2;
    sound.play();

    const timeout = setTimeout(() => {
        emits('onPrizeDefined');
        sound.pause();
        sound.currentTime = 1.2;
        soundWinner.volume = 1;
        soundWinner.play();
    }, props.spinningTime * 1000);

    return () => {
        console.log("props.spinningTime", props.spinningTime);
        console.log("clearTimeout");
        sound.remove();
        clearTimeout(timeout);
    };
});


const prizeIndexOffset = computed(() => {
    const prizeItemSize =
        type.value === 'horizontal' ? design.prizeItemWidth : design.prizeItemHeight;

    const prizeOffset = getPrizeOffset(
        prizeItemSize,
        props.prizeIndex,
        wrapperSize.value / 2
    );
    console.log(props.prizeIndex)
    console.log("prizeOffset", prizeOffset)



    const additionalOffset =
        props.options.stopInCenter === true ? 0 : getPrizeAdditionalOffset(prizeItemSize);

    return prizeOffset + additionalOffset;
});

const getPrizeOffset = (
    itemSize: number,
    prizeIndex: number,
    containerCenter: number,
) => itemSize * prizeIndex - (containerCenter - itemSize / 2);

const getPrizeAdditionalOffset = (itemSize: number): number => {
    const center = itemSize / 2;

    const randomOffset = getRandomIntInRange(-center + 1, center - 1);

    return randomOffset;
};

const getRandomIntInRange = (min: number, max: number): number => {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);

    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

const inlineStyles = computed(() => {
    const getAnimationProperty = () => {
        switch (type.value) {
            case RouletteOrientation.horizontal:
                return 'left';

            case RouletteOrientation.vertical:
                return 'top';

            default:
                throw new Error('Type is unknown');
        }
    };

    const animationProperty = getAnimationProperty();
    if (props.start === false) {
        return {
            [animationProperty]: '0',
            willChange: animationProperty,
        };
    }

    return {
        transition: `all ${props.spinningTime}s ${props.transitionFunction} 0s`,
        [animationProperty]: `-${prizeIndexOffset.value}px`,
    };
});


// watch(
//     [prizesElement, prizeItemWidth, prizeItemHeight],
//     ([newPrizesElement, newPrizeItemWidth, newPrizeItemHeight]) => {
//         if (newPrizesElement.length === 0) {
//             return;
//         }

//         for (let i = 0; i < newPrizesElement.length; i += 1) {
//             const itemStyle = newPrizesElement[i]?.props?.children?.props?.style;
//             const itemWidth = itemStyle?.width;
//             const itemHeight = itemStyle?.height;

//             if (width.value === -1 && height.value === -1) {
//                 width.value = itemWidth;
//                 height.value = itemHeight;
//                 continue;
//             }

//             if (width.value === itemWidth && height.value === itemHeight) {
//                 continue;
//             }

//             // Validación para asegurar consistencia en los tamaños
//             if (itemWidth !== newPrizeItemWidth || itemHeight !== newPrizeItemHeight) {
//                 console.error(
//                     'Uno o más elementos de premio tienen un ancho o altura diferente al establecido en designPlugin. Esto puede causar un cálculo incorrecto del desplazamiento del índice del premio. Verifica tu `prizeItemRenderFunction`. Todos los elementos del premio deben tener el mismo ancho y altura que los definidos en `prizeItemRenderFunction`',
//                 );
//             }

//             console.error(
//                 'Uno o más elementos de premio tienen un ancho o altura diferente; por lo tanto, la ruleta está calculando incorrectamente el desplazamiento del índice del premio. Todos los elementos de premio deben tener el mismo ancho y altura. Verifica tu `prizeItemRenderFunction` o las opciones de `designPlugin`.',
//             );

//             break;
//         }

//         reset();
//     },
// );

const wrapperClassName = classNames(
    props.classes,
    design.prizeItemClassName,
);

const isWithAnimation = props.options.withoutAnimation !== true && props.start !== true;

const prizeWrapperClassName = classNames(
    'roulette-pro-prize-list',
    {
        'with-animation': isWithAnimation,
    },
    [type],
);

</script>

<template>
    <div>
        <div :class="classNames('roulette-pro-wrapper', wrapperClassName)" ref="wrapperRef">
            <!-- <div v-if="!hideCenterDelimiter" class="roulette-pro-regular-design-top" :class="props.type"
            data-testid="design-top">
        </div> -->
            <div data-testid="design-top" :class="'roulette-pro-regular-design-top ' + type"></div>
            <ul :class="prizeWrapperClassName" :style="inlineStyles">
                <li v-for="prize in props.prizes" :class="prizeItemClassName" :key="prize._id">
                    <RegularDesign :prize="prize" :type="props.type"
                        :hideCenterDelimiter="props.defaultDesignOptions.hideCenterDelimiter"
                        :prizesWithText="props.defaultDesignOptions.prizesWithText">
                    </RegularDesign>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
.roulette-pro-prize-list {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
}

.roulette-pro-prize-list.horizontal {
    width: max-content;
}

.roulette-pro-prize-list.vertical {
    flex-direction: column;
    align-items: center;
}

.roulette-pro-prize-list.with-animation.horizontal {
    animation: roulette-horizontal-animation 100s linear infinite;
}

.roulette-pro-prize-list.with-animation.vertical {
    animation: roulette-vertical-animation 100s linear infinite;
}

@keyframes roulette-horizontal-animation {
    0% {
        /* transform: translateX(0); */
        /* left: 0; */
        transform: translate3d(0);
    }

    100% {
        /* transform: translateX(-3000px); */
        /* left: -3000px; */
        transform: translate3d(-3000px, 0, 0);
    }
}

@keyframes roulette-vertical-animation {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translate3d(0, -3000px, 0);
    }
}


.roulette-pro-wrapper {
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    margin: 0;
    color: #fff;
    overflow: hidden;
    height: 100%;
}






/* Top */
.roulette-pro-regular-design-top {
    position: absolute;
    z-index: 10;
    background: #ff7524 linear-gradient(0deg, #ef3a28, #ff9305);
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

.roulette-pro-regular-design-top.horizontal {
    width: 4px;
    height: 100%;
}

.roulette-pro-regular-design-top.vertical {
    width: 100%;
    height: 4px;
}
</style>