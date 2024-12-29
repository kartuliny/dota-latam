<template>
    <footer class="bg-negro roboto py-30">
        <section class="section">
            <div class="d-flex justify-center align-center">
                <img src="@/assets/images/logo_final.webp" width="100" alt="logo footer">
                <h2 class="text-white">Dota 2 Latam</h2>
            </div>
            <div class="d-flex justify-center align-center mb-20">
                <a href="https://discord.com/invite/dota-2-oficial" target="_blank"><img class="footer-social" src="@/assets/images/discord.png"  width="45" alt="discord_footer"></a>
                <a href="https://www.youtube.com/@ruslan8741" target="_blank"><img  class="footer-social ml-20" src="@/assets/images/youtube_logo.webp" width="45" alt="youtube_footer"></a>
            </div>
            <div class="d-flex justify-center align-center">
                © 2024 | Hecho por Luki <i class="px-10 bi bi-heart-fill text-rojo"></i> | Todos los derechos reservados
            </div>
        </section>
    </footer>
</template>

<style lang="scss" scoped>

footer a {
    text-decoration: none;
    transition: 0.25s ease-in-out;
    cursor: pointer;
}

footer a:hover {
    transform: scale(0.65);
    transform: translateY(-10px);
}

.footer-social {
    transform: scale(0.75);
    transform: translateY(-10px);
}
</style>