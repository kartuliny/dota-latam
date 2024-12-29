<script setup lang="ts">
import Modal from '@/sections/shared/look/Modal/Modal.vue';
import { useSettingStore } from '../shared/store/setting/setting';
import { inject, onMounted, onUnmounted, ref } from 'vue';
import { UpdateTradeUrlUseCase } from '@/modules/shared/user/application/user/UpdateTradeUrlUseCase';
import { useSocketStore } from '../shared/store/socket/socket';

const setingStore = useSettingStore();
const steamUrl = ref<string>('');
const showToast = inject<any>('showToast');
const sockerStore = useSocketStore();

onMounted(() => {
    steamUrl.value = sockerStore.userData.tradeUrl;
})

const submit = async () => {
    setingStore.showSteamTradeModal = false;
    try {
        await UpdateTradeUrlUseCase.invoke(steamUrl.value);
        showToast({
            title: '',
            message: "Se ha guardado correctamente",
            type: 'success',
            autoClose: true,
        });
    } catch (error) {
        showToast({
            title: '',
            message: "Ha ocurrido un error al guardar",
            type: 'error',
            autoClose: true,
        });
        console.error(error);
    }
}

onUnmounted(() => {
    setingStore.showSteamTradeModal = false;
})
</script>

<template>
    <Modal width="600px" :showFooter="false" @close="setingStore.toggleShowSteamTradeModal()">
        <template #title>
            <h4 class="text-center position-relative">Actualiza tu trade URL de Steam</h4>
        </template>

        <div class="position-relative">
            <div class="form-control mb-20">
                <input type="text" name="steamUrl" v-model="steamUrl" placeholder="Steam URL" />
                <ErrorMessage name="steamUrl"></ErrorMessage>
            </div>
        </div>

        <div class="modal__footer">
            <div class="pl-36 pr-24 d-flex justify-evenly pt-12">
                <button class="btn outline" @click="setingStore.toggleShowSteamTradeModal()">Cancelar</button>
                <button class="btn submit" @click="submit">Actualizar</button>
            </div>
        </div>
    </Modal>
</template>

<style lang="scss" scoped></style>