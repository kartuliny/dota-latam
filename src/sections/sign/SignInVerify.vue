<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useUserStore } from '../shared/store/user/user';
import { router } from '@/router';

const userStore = useUserStore()

onMounted(() => {
    handleDiscordCallback();
});

const exchangeCodeForToken = async (code: string) => {
    const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: import.meta.env.VITE_BASE_URL + '/login/callback',
    };

    const formData = new URLSearchParams(data).toString();

    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: import.meta.env.VITE_DISCORD_CLIENT_ID,
                password: import.meta.env.VITE_DISCORD_CLIENT_SECRET,
            }
        });

        const accessToken = response.data.access_token;

        const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log("User response", userResponse.data);
        userStore.setUser(userResponse.data);
        router.push('/');

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error al obtener el token o los datos del usuario:', error.response?.data || error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        throw error;
    }
};

const handleDiscordCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    console.log("Code", code);

    const storedState = localStorage.getItem('discord_oauth_state');
    if (state !== storedState) {
        return alert('El estado no coincide. ¡Posible ataque CSRF!');
    }

    if (code) {
        await exchangeCodeForToken(code);
    }
};
</script>

<template>
</template>
