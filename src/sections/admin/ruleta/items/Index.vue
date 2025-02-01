<script setup lang="ts">
import { GetItemsUseCase } from '@/modules/admin/chest/application/item/GetItemsUseCase';
import { ClassifiedItems } from '@/modules/admin/chest/domain/models/Item';
import { onMounted, reactive, ref } from 'vue';

const items = ref < ClassifiedItems > ({});

const fetchItems = async () => {
    items.value = await GetItemsUseCase.invoke();
};

onMounted(() => {
    fetchItems();
});
</script>
<template>
    <div>

    </div>
</template>