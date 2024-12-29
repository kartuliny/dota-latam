<script setup lang="ts">
const loginWithDiscord = () => {
    console.log('Login with Discord');
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_BACKEND_BASE_URL + '/auth_latam');
    const scope = 'identify guilds';
    const state = generateState();

    // Redirige al usuario a la página de autenticación de Discord
    window.location.href = `https://discord.com/oauth2/authorize?response_type=code&scope&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
}

const generateState = () => {
    const state = Math.random().toString(36).substring(2);
    localStorage.setItem('discord_oauth_state', state);  // Guardamos el estado generado
    return state;
}

</script>
<template>
    <div class="login">
        <!-- <div class="d-flex justify-center align-center">
            <img src="@/assets/images/logo_final.webp" alt="logo" width="100">
            <h1 class="text-dota2-red mb-56">Dota 2 Latam</h1>
        </div> -->
        <div class="d-flex justify-center align-center w-full">
            <!-- <img class="avatar" src="@/assets/images/lich.webp" alt="lich"> -->
            <img src="@/assets/images/logo_final.webp" alt="logo" width="320">

            <div class="login-section">
                <h2 class="mb-20 text-center">Iniciar sesión</h2>
                <div class="form-control">
                    <input type="text" placeholder="Usuario" />
                </div>

                <div class="form-control mb-20">
                    <input type="password" placeholder="Contraseña" />
                </div>

                <button class="btn submit mb-16">Ingresar</button>

                <p class="text-dota2-grey fs-5 mb-16">No tienes cuenta aún? Registrate aquí</p>

                <div class="d-flex w-full justify-center mb-16">
                    <hr class="w-10 hr-initial"><span class="ml-10 mr-10">or</span>
                    <hr class="w-10 hr-initial">
                </div>

                <button clasS="btn btn-discord">
                    <img class="logo-discord mr-10" src="@/assets/images/discord-white.webp" alt="discord" width="24">
                    <span class="fs-4" @click="loginWithDiscord">Continuar con Discord</span>
                </button>
            </div>
            <!-- <img class="avatar" src="@/assets/images/lich.webp" alt="lich"> -->

        </div>
    </div>
</template>

<style lang="scss">
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 620px;
    margin: 0 auto;

    .avatar {
        width: 280px;
    }

    &-section {
        width: 100%;
    }
}
</style>
