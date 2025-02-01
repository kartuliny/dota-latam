<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getRarityName } from '@/utils/format/items';
import { ClassifiedItems, Item } from '@/modules/admin/chest/domain/models/Item';
import { GetItemsUseCase } from '@/modules/admin/chest/application/item/GetItemsUseCase';
import { RefreshItemsUseCase } from '@/modules/admin/chest/application/item/RefreshItemsUseCase';

const loading = ref<boolean>(false);
const route = useRoute();
const items = ref<ClassifiedItems>({});
const arrayItems = computed(() => {
    return Object.values(items.value);
});
const selectedItems = ref<Item[]>([]);

const id = computed(() => {
    return route.params.id;
});


// const onSelectedItem = (item: RouletteAdminItem) => {
//     const index = items.value.findIndex((t) => t.name === item.name);

//     if (index === -1) {
//         items.value.push(item);
//     } else {
//         items.value.splice(index, 1);
//     }

//     selectedItems.value = selectedItems.value.filter((t) => t.name !== item.name);
// }

// const onItem = (item: RouletteAdminItem) => {
//     const index = selectedItems.value.findIndex((t) => t.name === item.name);

//     if (index === -1) {
//         selectedItems.value.push(item);
//     } else {
//         selectedItems.value.splice(index, 1);
//     }

//     items.value = items.value.filter((t) => t.name !== item.name);
// }

const fetchItems = async () => {
    try {
        loading.value = true;
        items.value = await GetItemsUseCase.invoke();
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

const refreshItems = async () => {
    try {
        loading.value = true;
        await RefreshItemsUseCase.invoke();
        fetchItems();
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchItems();
});

</script>

<template>
    <div class="w-full pt-40 h-100" v-loading="loading">
        <div class="container text-gris-latam">
            <div class="d-flex justify-space-between align-center w-full mb-20">
                <h2>Grupo de tesoros {{ id }}</h2>
                <button class="btn submit">Guardar</button>
            </div>

            <div class="p-20 border-gris-latam rounded-lg mb-80">
                <h4>Grupo ??</h4>
                <div class="d-grid grid-cols-7">
                    <div v-for="item in selectedItems""
                        class=" pointer">
                        <div>
                            <div class="item">
                                <img :src="item.image">
                                <span class="type" :class="`rarity-${item.rarity}`">{{
                                    getRarityName(item.rarity)
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="btn submit mb-20" @click="refreshItems">Actualizar items</button>

            <div class="p-20 border-gris-latam rounded-lg">
                <div class="d-grid grid-cols-7">
                    <div v-for="item in arrayItems" class="pointer">
                        <div>
                            <div class="item">
                                <img :src="item.image">
                                <span class="title">Cantidad: {{ item.quantity }}</span>
                                <span class="type" :class="`rarity-${item.rarity}`">{{
                                    getRarityName(item.rarity)
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/scss/utils' as *;

.item {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 140px;
    border-radius: 25%;
    cursor: pointer;

    img {
        border: 1px solid transparent;
        width: 100%;
        object-fit: cover;
        border-radius: 0%;
        background: linear-gradient(to bottom, #747474 50%, #747474 50%);

        @include breakpoints("lg") {
            border: 2px solid transparent;
        }
    }

    .title {
        background: rgba(0, 0, 0, 0.0);
        line-height: 0.3;
        padding-top: 8px;
        text-align: center;
        position: absolute;
        z-index: 100;
        padding-bottom: 10px;
        width: 100%;
        font-size: 12px;
        font-weight: 900;
        color: white;
        left: 0;
        top: 0%;
    }

    .type {
        background: rgba(0, 0, 0, 0.7);
        line-height: 0.3;
        padding-top: 8px;
        padding-bottom: 10px;
        text-align: center;
        position: absolute;
        z-index: 50;
        width: 96%;
        bottom: 5px;
        right: 0;
        left: 0;
        margin: 0 auto;
    }
}
</style>