<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import RoulettePro from '@/sections/shared/look/Roulette/roulette/Index.vue';
import { RouletteOrientation } from './roulette/Roulette.d';
import { RouletteItem } from '@/modules/roulette/domain/models/RouletteItem';
import { useSocketStore } from '../../store/socket/socket';

export interface SettingType {
    type: {
        name: string;
        options: string[];
        value: RouletteOrientation;
    };
    design: {
        name: string;
        options: string[];
        value: string;
    };
    prizesWithText: {
        name: string;
        options: boolean[];
        value: boolean;
    };
    withoutAnimation: {
        name: string;
        options: boolean[];
        value: boolean;
    };
    hideCenterDelimiter: {
        name: string;
        options: boolean[];
        value: boolean;
        forDesign: string;
    };
    soundWhileSpinning: {
        name: string;
        options: boolean[];
        value: boolean;
    };
    stopInCenter: {
        name: string;
        options: boolean[];
        value: boolean;
    };
    spinningTime: {
        name: string;
        options: string[];
        value: string;
    };
    [key: string]: {
        name: string;
        options: (string | boolean)[];
        value: string | boolean;
        forDesign?: string;
    };
}

export interface Prize {
    id: string;
    image: string;
    text: string;
}

const props = defineProps<{
    buttonText: string;
    prizes: RouletteItem[];
    index: number;
    start: boolean;
}>();

const emits = defineEmits(['start', 'run', 'done']);

const settings = reactive<SettingType>({
    type: {
        name: 'Type',
        options: ['horizontal', 'vertical'],
        value: RouletteOrientation.horizontal,
    },
    design: {
        name: 'Design',
        options: ['Regular'],
        value: 'Regular',
    },
    prizesWithText: {
        name: 'Prizes with text',
        options: [false, true],
        value: false,
    },
    withoutAnimation: {
        name: 'Without animation',
        options: [false, true],
        value: false,
    },
    hideCenterDelimiter: {
        name: 'Hide center delimiter',
        options: [false, true],
        value: false,
        forDesign: 'Regular',
    },
    // hideTopArrow: {
    //   name: 'Hide top arrow',
    //   options: [false, true],
    //   value: false,
    //   forDesign: 'GracefulLines',
    // },
    // hideSideArrows: {
    //   name: 'Hide side arrows',
    //   options: [false, true],
    //   value: false,
    //   forDesign: 'GracefulLines',
    // },
    // replaceBottomArrowWithTopArrow: {
    //   name: 'Replace bottom arrow with top arrow',
    //   options: [false, true],
    //   value: false,
    //   forDesign: 'GracefulLines',
    // },
    soundWhileSpinning: {
        name: 'Sound while spinning',
        options: [false, true],
        value: false,
    },
    stopInCenter: {
        name: 'Stop in the prize item center',
        options: [false, true],
        value: false,
    },
    spinningTime: {
        name: 'Spinning time',
        options: ['3', '5', '10', '15', '20'],
        value: '10',
    },
});

const spinning = ref<boolean>(false);
const socketStore = useSocketStore();

const freeSpin = computed(() => socketStore.userData.freeSpin);
    
const reproductionArray = (array: RouletteItem[] = [], length = 0) => [
    ...Array(length)
        .fill('_')
        .map(() => array[Math.floor(Math.random() * array.length)]),
];

const getRandomIntInRange = (min = 0, max = 0) => {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);

    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

const getDesignOptions = (settings: SettingType) => {
    const result: { [key: string]: any } = {};
    const keys = Object.keys(settings);

    keys.forEach((key) => {
        const setting = settings[key as keyof SettingType];
        const { value } = setting;

        if ('forDesign' in setting && !setting.forDesign) {
            return;
        }

        result[key] = value;
    });

    return result;
};

const API = {
    getPrizeIndex: async () => {
        const randomPrizeIndex = getRandomIntInRange(0, props.prizes.length - 1);
        const randomPrizeIndexOffset = props.prizes.length * 4;

        return randomPrizeIndex + randomPrizeIndexOffset;
    },
};

watch([props.index, props.start], ([newPrizeIndex, newStart]) => {
    if (!newPrizeIndex || newStart) {
        return;
    }

    console.log("start.value sart", props.start)
    // emits('start', true);
});

watch([spinning, props.prizes], ([newSpinning, newPrizeList]) => {
    if (!newSpinning || !newPrizeList.length) {
        return;
    }

    const prepare = async () => {
        try {
            const newPrizeIndex = await API.getPrizeIndex();
            // emits('start', false);

            const { _id } = newPrizeList[newPrizeIndex];

            console.log(`Prize selected: ${newPrizeList[newPrizeIndex].name}`);
            console.log(`Prize index: ${newPrizeIndex}, Prize ID: ${_id}`);
        } catch (error) {
            console.error("Error fetching prize index:", error);
        }
    };

    prepare();
});

const handleStart = () => {
    emits('run');
    spinning.value = true;
};

const handlePrizeDefined = () => {
    console.log("Prize defined");
    spinning.value = false;
    emits('start', false);
    console.log("start.value after prize defined", props.start)
    emits('done');
};

// const isArrayOf = (type, array) => array.every((item) => typeof item === type);

// const updateSetting = (param: string, newParam: any) => {
//     settings[param] = newParam;
// };

// const handleSettingsChange = (e: Event) => {
//     const target = e.target as HTMLElement;
//     const { param } = target.dataset;

//     const inputTarget = target as HTMLInputElement;
//     const newValue = inputTarget.checked !== undefined ? inputTarget.checked : inputTarget.value;

//     const newParam = { ...settings[param as keyof SettingType] };
//     newParam.value = newValue;

//     settings[param as keyof SettingType] = newParam;

//     window.scrollTo({ top: 0, behavior: 'smooth' });
// };

const type = settings.type.value;
const stopInCenter = settings.stopInCenter.value;
const withoutAnimation = settings.withoutAnimation.value;
const prizesWithText = settings.prizesWithText.value;
const hideCenterDelimiter = settings.hideCenterDelimiter.value;
const spinningTime = +settings.spinningTime.value;

const designOptions = getDesignOptions(settings);

const newPrizes = computed(() => {
    return [
        ...props.prizes,
        ...reproductionArray(props.prizes, props.prizes.length * 3),
        ...props.prizes,
        ...reproductionArray(props.prizes, props.prizes.length),
    ].map((prize, index) => ({ ...prize, _id: prize._id + '_' + index }));
});
</script>

<template>
    <div class="w-100">
        <div class="roulette mb-20" :class="{ [`${type}`]: true }">
            <RoulettePro :type="type" @onPrizeDefined="handlePrizeDefined" :prizes="newPrizes"
                :designOption="designOptions" :options="{ stopInCenter, withoutAnimation }"
                :defaultDesignOptions="{ hideCenterDelimiter, prizesWithText }" :spinningTime="spinningTime"
                :start="start" :prizeIndex="props.index" classes="roulette-pro-wrapper-additional-styles"
                transition-function="cubic-bezier(0.0125, 0.1, 0.1, 1)">
            </RoulettePro>
        </div>
        <div class="roulette-actions">
            <button @click="handleStart" className="spin-button" type="button">
                {{ freeSpin ? 'Gratis ('+freeSpin+')' : props.buttonText }}
            </button>
        </div>
    </div>
</template>

<style>
@import './Index.css';
</style>