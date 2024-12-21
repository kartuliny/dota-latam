<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import Register from '@/sections/admin/ruleta/register/Index.vue';
import { RouletteAdminItem } from '@/modules/admin/roulette/domain/models/RouletteAdminItem';
import { GetRouletteAdminItemsUseCase } from '@/modules/admin/roulette/application/GetRouletteAdminItemsUseCase';
import { getRarityName, getRouletteTypeName } from '../../../../utils/format/items';

const showToast = inject<any>('showToast');
const showRegister = ref<boolean>(false);
const items = ref<RouletteAdminItem[]>();
const loading = ref<boolean>(false);

const columns = [
    { label: 'Imagen', name: 'image' },
    { label: 'Nombre', name: 'name' },
    { label: 'Rareza', name: 'rarity' },
    { label: 'Stock', name: 'stock' },
    { label: 'Precio', name: 'price' },
    { label: 'Tipo', name: 'type' },
];

const columnStyle = computed(() => {
    return columns.length <= 6
        ? { width: `${100 / columns.length}%` }
        : { minWidth: '120px', width: '100px' };
});

const reload = () => {
    showRegister.value = false;
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

onMounted(() => {
    getItems()
});

</script>
<template>
    <transition name="fade">
        <Register v-if="showRegister" @close="showRegister = false" @reload="reload"></Register>
    </transition>
    <div class="w-100 pt-40 h-100" v-loading="loading">
        <div class="container">
            <div class="d-flex justify-content-space-between align-items-center w-100">
                <h2>Ruleta items</h2>
                <button class="btn submit" @click="showRegister = true">Registrar</button>
            </div>
        </div>
        <div class="container pt-0 overflow-visible w-100">
            <div class="table-container overflow-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th v-for=" column in columns" :style="columnStyle">{{ column.label }}
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
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>