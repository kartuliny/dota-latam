<script setup lang="ts">
import Modal from '@/sections/shared/look/Modal/Modal.vue';
import { inject, ref } from 'vue';
import { StoreChestGroupUseCase } from '@/modules/admin/chest/application/chestGroup/StoreChestGroupUseCase';

const emit = defineEmits(['close', 'reload']);
const showToast = inject<any>('showToast');

const chestGroup = ref({
    name: '',
    type: 'normal',
    enabled: true,
});

const types = [
    { name: 'Evento', value: 'event' },
    { name: 'Normal', value: 'normal' },
    { name: 'Premium', value: 'premium' },
];

const register = async () => {
    try {
        await StoreChestGroupUseCase.invoke(chestGroup.value);

        showToast({
            title: '',
            message: "Se ha guardado correctamente",
            type: 'success',
            autoClose: true,
        });

        emit('reload');
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

const submit = () => {
    register();
}
</script>

<template>
    <Modal width="40vw" padding="4rem 2rem" height="80vh" :showFooter="true" @close="emit('close')" @submit="submit">
        <h4 slot="title" class="mb-24 position-relative">Crear grupo de cofres</h4>
        <div class="register">
            <div class="input-group">
                <label for="name">Nombre</label>
                <input id="name" name="name" type="text" placeholder="Ingresar" v-model="chestGroup.name">
                <!-- <ErrorMessage name="version"></ErrorMessage> -->
            </div>
            <div class="input-group">
                <label for="rarity">Rareza</label>
                <select id="rarity" name="rarity" v-model="chestGroup.type">
                    <option v-for="type in types" :value="type.value">{{ type.name }}</option>
                </select>
                <!-- <ErrorMessage name="version"></ErrorMessage> -->
            </div>
            <div class="position-relative d-flex align-center">
                <label class="text-gris-latam" for="enabled">Habilitado?</label>
                <label class="switch ml-20" for="maincheckbox">
                    <input type="checkbox" :id="`maincheckbox`" v-model="chestGroup.enabled" />
                    <div class="slider round"></div>
                </label>
            </div>
        </div>
    </Modal>
</template>

<style lang="scss">
.register {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr;
}
</style>