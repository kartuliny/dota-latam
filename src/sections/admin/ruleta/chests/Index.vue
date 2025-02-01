<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Chest } from '@/modules/admin/chest/domain/models/Chest';
import { GetChestsUseCase } from '@/modules/admin/chest/application/chest/GetChestsUseCase';
import Register from './register/Index.vue';
import Editing from './edit/Index.vue';

const showToast = inject<any>('showToast');
const showRegister = ref<boolean>(false);
const showEdit = ref<boolean>(false);
const loading = ref<boolean>(false);
const router = useRouter();
const chests = ref<Chest[]>();
const itemEdit = ref<Chest>();

const columns = [
    { label: 'Nombre', name: 'name' },
    { label: 'Mostrar probabilidades', name: 'showDropRate' },
    { label: 'Imagen fondo', name: 'bagroundImageUrl' },
    { label: 'Imagen contenido', name: 'contentImageUrl' },
    { label: 'Tipo moneda', name: 'moneyType' },
    { label: 'Valor', name: 'moneyValue' },
    { label: 'Habilitado', name: 'enabled' },
    { label: 'Acciones', name: '' },
];

const columnStyle = computed(() => {
    return columns.length <= 6
        ? { width: `${100 / columns.length}%` }
        : { minWidth: '120px', width: '100px' };
});

const reload = () => {
    showRegister.value = false;
    showEdit.value = false;
    getChests();
};

const getChests = async () => {
    try {
        loading.value = true;
        chests.value = await GetChestsUseCase.invoke();
    } catch (error) {
        console.error(error);
        showToast({
            title: '',
            message: "Error al obtener los items",
            type: 'error',
            autoClose: true,
        });
    } finally {
        loading.value = false;
    }
};

const onEditItem = (item: Chest) => {
    itemEdit!.value = item;
    showEdit.value = true;
};

onMounted(() => {
    getChests()
});

const onShowItems = (chest: Chest) => {
    router.push({ name: 'admin-cofres-detail', params: { id: chest._id ?? "xdd" } });
}

</script>
<template>
    <transition name="fade">
        <Editing v-if="showEdit" @close="showEdit = false" :item="itemEdit!" @reload="reload"></Editing>
    </transition>
    <transition name="fade">
        <Register v-if="showRegister" @close="showRegister = false" @reload="reload"></Register>
    </transition>
    <div class="w-full pt-40 h-100" v-loading="loading">
        <div class="container">
            <div class="d-flex justify-space-between align-center w-full">
                <h2>Cofres</h2>
                <button class="btn submit" @click="showRegister = true">Registrar</button>
            </div>
        </div>
        <div class="container pt-0 overflow-visible w-full">
            <div class="table-container overflow-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="bold text-gris-latam" v-for=" column in columns" :style="columnStyle">{{
                                column.label }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(chest, index) in chests">
                            <td :style="columnStyle">{{ chest.name }}</td>
                            <td :style="columnStyle">{{ chest.showDropRate ? 'Si' : 'No' }}</td>
                            <td :style="columnStyle"><img :src="$staticBackUrl+'/'+chest.backgroundImageUrl" :alt="`image-index-${index}`"
                                    width="100"></td>
                            <td :style="columnStyle"><img :src="$staticBackUrl+'/'+chest.contentImageUrl" :alt="`image-${index}`"
                                    width="100"></td>
                            <td :style="columnStyle">{{ chest.moneyType }}</td>
                            <td :style="columnStyle">{{ chest.moneyValue }}</td>
                            <td :style="columnStyle">
                                {{ chest.enabled ? 'Si' : 'No' }}
                            </td>
                            <td :style="columnStyle">
                                <button class="btn outline" @click="onEditItem(chest)"> Editar</button>
                                <button class="btn submit" @click="onShowItems(chest)"> Ver items</button>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>