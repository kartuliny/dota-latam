<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useSocketStore } from './shared/store/socket/socket';
import { GetUserDataUseCase } from '@/modules/shared/user/application/user/GetUserDataUseCase';

const socketStore = useSocketStore();

onMounted(async() => {
    const userData = await GetUserDataUseCase.invoke();
    socketStore.setUserData(userData);
    socketStore.connectSocket();
});

onUnmounted(() => {
    socketStore.disconnectSocket();
});

</script>

<template>
    <router-view />
</template>