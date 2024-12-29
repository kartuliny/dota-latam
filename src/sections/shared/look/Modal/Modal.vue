<script setup lang="ts">

const emit = defineEmits(['close', 'submit']);
defineProps({
    width: {
        type: String,
        default: "400px"
    },
    height: {
        type: String,
        default: "400px"
    },
    padding: {
        type: String,
        default: "2rem"
    },
    display: {
        type: String,
        default: "block"
    },
    showFooter: {
        type: Boolean,
        default: true
    }
})

</script>

<template>
    <div id="open-modal" class="modal">
        <div :style="{ width, padding, 'max-height': height, display }" class="modal__content">
            <a href="#" title="Close" class="modal-close" @click="emit('close')">
                <i class="bi bi-x-lg"></i>
            </a>
            <h1 class="m-0">
                <slot name="title"></slot>
            </h1>
            <slot></slot>

            <div v-if="showFooter" class="modal__footer">
                <div class="pl-36 pr-24 d-flex justify-evenly pt-12">
                    <button class="btn outline" @click="emit('close')">Cancelar</button>
                    <button class="btn submit" @click="emit('submit')">Crear</button>
                </div>
            </div>
        </div>
    </div>
</template>