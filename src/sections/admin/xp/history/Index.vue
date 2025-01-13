<script setup lang="ts">
import { GetXPAdminHistoryUseCase } from '@/modules/admin/xp/application/GetXPAdminHistoryUseCase';
import { UserXPData } from '@/modules/admin/xp/domain/models/UserXPData';
import { onMounted, ref } from 'vue';
import { formatDateToPeruTime } from '../../../../utils/format/date';

const items = ref<UserXPData[]>();
const loading = ref<boolean>(false);

const getHistory = async () => {
    try {
        loading.value = true;
        items.value = await GetXPAdminHistoryUseCase.invoke();
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    getHistory()
});

</script>
<template>
    <div class="container h-100" v-loading="loading">
        <div class="d-flex align-center justify-space-between pb-24 position-sticky pt-40 bg">
            <div class="d-flex align-center">
                <h2>Historial XP</h2>
            </div>
        </div>
        <div class="pb-60">
            <div class="mb-40" v-for="item in items">
                <div class="d-flex align-items-end mb-10">
                    <span class="fs-2 bold text-rojo-latam line-height-normal mr-4">{{ item.senderData ? item.senderData.displayName : 'Desconocido'
                        }}</span> envió
                    <strong class="fs-3 ml-4 mr-4">{{ item.xp }} XP a </strong>
                    <span class="fs-2 bold text-morado-latam line-height-normal mr-4"> {{ item.receiverData ? item.receiverData.displayName : 'Desconocido'
                        }}</span>
                </div>
                <div>
                    <span class="fs-2 bold text-morado-latam line-height-normal mr-4"> {{ item.receiverData ? item.receiverData.displayName : 'Desconocido'
                        }}</span> tenía

                    <span class="bold fs-3 mr-4">{{ item.oldXP }} XP</span> Ahora tiene <strong class="bold fs-3 mr-10">{{
                        item.newXP }} XP</strong> <span class="fs-3 mr-4">[{{ formatDateToPeruTime(item.createdAt)
                        }}]</span>

                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    color: var(--gris-latam);
}

</style>