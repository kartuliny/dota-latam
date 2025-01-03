<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import Register from '@/sections/admin/ruleta/register/Index.vue';
import Editing from '@/sections/admin/ruleta/edit/Index.vue';
import { RouletteAdminItem } from '@/modules/admin/roulette/domain/models/RouletteAdminItem';
import { GetRouletteAdminItemsUseCase } from '@/modules/admin/roulette/application/GetRouletteAdminItemsUseCase';
import { getRarityName, getRouletteTypeName } from '../../../../utils/format/items';

const showToast = inject<any>('showToast');
const showRegister = ref<boolean>(false);
const showEdit = ref<boolean>(false);
const itemEdit = ref<RouletteAdminItem>({} as RouletteAdminItem);
const items = ref<RouletteAdminItem[]>();
const loading = ref<boolean>(false);

const columns = [
    { label: 'Imagen', name: 'image' },
    { label: 'Nombre', name: 'name' },
    { label: 'Rareza', name: 'rarity' },
    { label: 'Stock', name: 'stock' },
    { label: 'Precio', name: 'price' },
    { label: 'Tipo', name: 'type' },
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
};

const getItems = async () => {
    try {
        loading.value = true;
        items.value = await GetRouletteAdminItemsUseCase.invoke();
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

const editing = (item: RouletteAdminItem) => {
    itemEdit.value = item;
    showEdit.value = true;
};

onMounted(() => {
    getItems()
});

</script>
<template>
    <transition name="fade">
        <Editing v-if="showEdit" @close="showEdit = false" :item="itemEdit" @reload="reload"></Editing>
    </transition>
    <transition name="fade">
        <Register v-if="showRegister" @close="showRegister = false" @reload="reload"></Register>
    </transition>
    <div class="w-full pt-40 h-100" v-loading="loading">
        <div class="container">
            <div class="d-flex justify-space-between align-center w-full">
                <h2>Ruleta items</h2>
                <button class="btn submit" @click="showRegister = true">Registrar</button>
            </div>
        </div>
        <div class="container pt-0 overflow-visible w-full">
            <div class="table-container overflow-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="bold text-gris-latam" v-for=" column in columns" :style="columnStyle">{{ column.label }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item) in items">
                            <td :style="columnStyle"><img :src="item.url" alt="image-{{index}}" width="100"></td>
                            <td :style="columnStyle">{{ item.name }}</td>
                            <td :style="columnStyle" :class="`bold rarity-`+ item.rarity">{{ getRarityName(item.rarity) }}</td>
                            <td :style="columnStyle">{{ item.quantity }}</td>
                            <td :style="columnStyle">{{ item.price }}</td>
                            <td :style="columnStyle">{{ getRouletteTypeName(item.type) }}</td>
                            <td :style="columnStyle">
                                {{ item.enabled ? 'Si' : 'No' }}
                            </td>
                            <td :style="columnStyle"><button @click="editing(item)" class="btn outline"> Editar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>