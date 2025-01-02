<template>
    <div class="w-full d-flex justify-center align-center">
        <div class="maintenance-page text-center">
            <div class="error-image">
                <h1>❗</h1>
            </div>
            <div class="error-msg-container">
                <h1 class="lh-1">¡Oops! Esta página no existe.</h1>
                <p class="fs-4">La página que estás buscando no se encuentra disponible o está en proceso.</p>
                <p class="fs-4">Por favor, regresa a la página principal o vuelve más tarde.</p>
            </div>
            <a class="btn" href="/">Regresar</a>
        </div>
    </div>
</template>

<style scoped>
.w-full {
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