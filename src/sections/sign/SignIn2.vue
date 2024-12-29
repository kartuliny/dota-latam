<script setup lang="ts">
import { AuthLoginParams } from '@/modules/sign/application/auth/AuthLoginParams';
import { AuthLogin } from '@/modules/sign/domain/models/auth/AuthLogin';
import { ErrorMessage, useForm } from 'vee-validate';

const { defineField } = useForm({
    initialValues: <AuthLoginParams>AuthLogin.initital(),
    validationSchema: AuthLogin.validationSchema()
});

const [email] = defineField('email');
const [password] = defineField('password');

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
            <img class="avatar" src="@/assets/images/marco2.webp" alt="logo">

            <div class="login-section">
                <!-- <h2 class="mb-20 text-center">{{ $t('login.title') }}</h2> -->
                <div class="form-control mb-20">
                    <input type="text" v-model="email" :placeholder="$t('login.username')" />
                    <ErrorMessage name="email"></ErrorMessage>
                </div>

                <div class="form-control mb-20">
                    <input type="password" v-model="password" :placeholder="$t('login.password')" />
                    <ErrorMessage name="password"></ErrorMessage>
                </div>

                <button class="w-full btn submit mb-16">{{ $t('login.login') }}</button>

                <p class="text-dota2-grey fs-5 mb-16">{{ $t('login.dontHaveAccount') }} {{ $t('login.register') }}</p>

                <div class="d-flex w-full justify-center mb-16">
                    <hr class="w-10 hr-initial"><span class="ml-10 mr-10">{{ $t('labels.or') }}</span>
                    <hr class="w-10 hr-initial">
                </div>

                <button clasS="btn discord w-full">
                    <img class="logo-discord mr-10" src="@/assets/images/discord-white.webp" alt="discord" width="24">
                    <span class="fs-4" @click="loginWithDiscord">{{ $t('login.continueWith') }} Discord</span>
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
    width: 320px;
    margin: 0 auto;

    .avatar {
        // position: absolute;
        // opacity: 0.3;
        // z-index: -1;
        // top: 107px;
        // width: 880px;
        position: absolute;
        opacity: 0.3;
        z-index: -1;
        top: 180px;
        width: 580px;
    }

    &-section {
        width: 100%;
    }
}
</style>
