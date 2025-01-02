<script setup lang="ts">
const isMaintenanceMode = import.meta.env.VITE_MANTENIMIENTO === 'true'
</script>

<template>
    <div class="w-full d-flex justify-center align-center">
        <div v-if="isMaintenanceMode" class="maintenance-page">
            <div class="error-image">
                <h1>👨‍🔧</h1>
            </div>
            <div class="error-msg-container">
                <h1 class="lh-1">¡Estamos en mantenimiento!</h1>
                <p class="fs-4">Esperamos que esta interrupción no dure mucho. Si sigues viendo esta página, por
                    favor contáctanos en nuestro servidor de Discord.</p>
                <p class="fs-4">Te pedimos disculpas por cualquier inconveniente.</p>
            </div>
        </div>

        <div v-else>
            <router-view />
        </div>
    </div>
</template>

<style scoped>
.w-full {
    background:var(--rojo-latam);
    background: linear-gradient(135deg,
            rgb(54, 5, 5) 35%,
            #320202 100%) !important;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}

.error-image {
    max-width: 720px;
    width: 90%;
    margin: auto;
    text-align: center;
}

.error-image h1 {
    font-size: 120px;
    margin: 48px auto 20px;
}

.error-msg-container {
    margin: 18px auto 30px auto;
    max-width: 800px;
    width: 80%;
    text-align: center;
}

.error-msg-container h1 {
    font-size: 36px;
    max-width: 560px;
    margin: auto auto 48px;
}
</style>