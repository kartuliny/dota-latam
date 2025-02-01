<script setup lang="ts">
import { UpdateChestGroupUseCase } from '@/modules/admin/chest/application/chestGroup/UpdateChestGroupUseCase';
import { ChestGroup } from '@/modules/admin/chest/domain/models/ChestGroup';
import Modal from '@/sections/shared/look/Modal/Modal.vue';
import { inject, onMounted, ref } from 'vue';

const emit = defineEmits(['close', 'reload']);
const showToast = inject<any>('showToast');
const props = defineProps<{
    item: ChestGroup;
}>();

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

const edit = async () => {
    try {
        await UpdateChestGroupUseCase.invoke(chestGroup.value);

        showToast({
            title: '',
            message: "Se ha actualizado correctamente",
            type: 'success',
            autoClose: true,
        });

        emit('reload');
    } catch (error) {
        showToast({
            title: '',
            message: "Ha ocurrido un error al actualizar",
            type: 'error',
            autoClose: true,
        });

        console.error(error);
    }
}

const submit = () => {
    edit();
}

onMounted(() => {
    chestGroup.value = props.item;
})
</script>

<template>
    <Modal width="40vw" padding="4rem 2rem" height="80vh" :showFooter="false" @close="emit('close')" @submit="submit">
        <h4 slot="title" class="mb-24 position-relative">Editar grupo de cofres</h4>
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

        <div class="d-flex justify-evenly pt-12 position-relative">
            <button class="btn outline" @click="emit('close')">Cancelar</button>
            <button class="btn submit" @click="submit">Actualizar</button>
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