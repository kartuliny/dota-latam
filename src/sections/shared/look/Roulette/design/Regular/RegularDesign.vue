<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { RouletteOrientation } from '../../roulette/Roulette.d';
import { RouletteItem } from '@/modules/roulette/domain/models/RouletteItem';

// Definición de props
const props = defineProps<{
    hideCenterDelimiter?: boolean;
    prizesWithText?: boolean;
    type: RouletteOrientation;
    prize: RouletteItem;
}>();

const prizeItemWidth = 205;

const prizeItemHeightWithoutText = computed(() =>
    props.type === 'vertical' ? 172 : 174
);

const prizeItemHeight = computed(() =>
    props.prizesWithText ? 234 : prizeItemHeightWithoutText.value
);

// Texto condicional para los ítems
const hasText = (text?: string) => props.prizesWithText && text !== undefined;
</script>

<template>
    <div class="roulette-pro-regular-design">

        <!-- Lista de premios -->
        <div class="roulette-pro-regular-prize-item"
            :style="{ width: `${prizeItemWidth}px`, height: `${prizeItemHeight}px` }">
            <div :class="[
                'roulette-pro-regular-prize-item-wrapper',
                { center: !hasText(props.prize.name) }
            ]">
                <div class="roulette-pro-regular-image-wrapper">
                    <img class="roulette-pro-regular-prize-item-image" :src="props.prize.url"
                        :alt="hasText(props.prize.name) ? `prize item ${props.prize.name}` : 'prize item'" />
                </div>
                <p v-if="hasText(props.prize.name)" class="roulette-pro-regular-prize-item-text">
                    {{ props.prize.name }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// const examplePrizes = [
//     { image: '/src/assets/images/anime-profile.webp', text: 'Prize 1' },
//     { image: '/src/assets/images/heraldo.webp' }, // Sin texto
//     { image: '/src/assets/images/inmortal.webp', text: 'Prize 3' },
// ];
</script>

<style scoped>
/* Importa tu estilo aquí o defínelo directamente */
@import './Regular.css';
</style>
