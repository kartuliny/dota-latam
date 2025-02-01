<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useSocketStore } from './shared/store/socket/socket';
import { GetUserDataUseCase } from '@/modules/shared/user/application/user/GetUserDataUseCase';
import { GetUserProfileUseCase } from '@/modules/shared/user/application/user/GetUserProfileUseCase';

const socketStore = useSocketStore();

onMounted(async() => {
    const userData = await GetUserDataUseCase.invoke();
    const userProfile = await GetUserProfileUseCase.invoke();
    socketStore.setUserData(userData);
    socketStore.setUserProfile(userProfile);
    socketStore.connectSocket();
});

onUnmounted(() => {
    socketStore.disconnectSocket();
});

</script>

<template>
    <router-view />
</template>