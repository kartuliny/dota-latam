<script setup lang="ts">
import { RegisterRouletteAdminItemUseCase } from '@/modules/admin/roulette/application/RegisterRouletteAdminItemUseCase';
import { RouletteAdminItem } from '@/modules/admin/roulette/domain/models/RouletteAdminItem';
import Modal from '@/sections/shared/look/Modal/Modal.vue';
import { inject, ref } from 'vue';

const emit = defineEmits(['close', 'reload']);
const showToast = inject<any>('showToast');

const rarities = [
    { name: 'Común', value: 0 },
    { name: 'Poco Común', value: 1 },
    { name: 'Raro', value: 2 },
    { name: 'Mítico', value: 3 },
    { name: 'Legendario', value: 4 },
    { name: 'Inmortal', value: 5 },
    { name: 'Arcano', value: 6 },
];

const types = [
    { name: 'Facil', value: 0 },
    { name: 'Dificil', value: 1 },
    { name: 'Extremadamente dificil', value: 2 },
]

const rouletteItem = ref<RouletteAdminItem>({
    _id: '',
    name: '',
    rarity: 0,
    url: '',
    type: 0,
    quantity: 0,
    price: 0,
    enabled: false,
});

const register = async () => {
    try {
        await RegisterRouletteAdminItemUseCase.invoke(rouletteItem.value);

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
        <h4 slot="title" class="mb-24">Crear item</h4>
        <div class="register">
            <div class="input-group">
                <label for="name">Nombre</label>
                <input id="name" name="name" type="text" placeholder="Ingresar" v-model="rouletteItem.name">
                <!-- <ErrorMessage name="version"></ErrorMessage> -->
            </div>
            <div class="input-group">
                <label for="rarity">Rareza</label>
                <select id="rarity" name="rarity" v-model="rouletteItem.rarity">
                    <option v-for="rarity in rarities" :value="rarity.value">{{ rarity.name }}</option>
                </select>
                <!-- <ErrorMessage name="version"></ErrorMessage> -->
            </div>
            <div class="input-group">
                <label for="url">URL Imagen</label>
                <input id="url" type="text" placeholder="Ingresar" v-model="rouletteItem.url">
                <!-- <ErrorMessage name="version"></ErrorMessage> -->
            </div>
            <div class="input-group">
                <label for="type">Tipo (Ruleta)</label>
                <select id="type" name="type" v-model="rouletteItem.type">
                    <option v-for="type in types" :value="type.value">{{ type.name }}</option>
                </select>
                <!-- <ErrorMessage name="version"></ErrorMessage> -->
            </div>
            <div class="input-group">
                <label for="quantity">Cantidad</label>
                <input id="quantity" type="text" placeholder="Ingresar" v-model="rouletteItem.quantity">
                <!-- <ErrorMessage name="version"></ErrorMessage> -->
            </div>
            <div class="input-group">
                <label for="price">Precio</label>
                <input id="price" type="text" placeholder="Ingresar" v-model="rouletteItem.price">
                <!-- <ErrorMessage name="version"></ErrorMessage> -->
            </div>
        </div>
    </Modal>
</template>

<style lang="scss">
.register {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr 1fr;
}
</style>