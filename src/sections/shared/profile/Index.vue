<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import { useSocketStore } from '../store/socket/socket';
import { formatNumber } from '@/utils/format/numbers';
import { useRouter } from 'vue-router';
import { UpdateTradeUrlUseCase } from '@/modules/shared/user/application/user/UpdateTradeUrlUseCase';
import Pagination from '../look/Pagination/Pagination.vue';
import { PaginationTableType } from '../look/Pagination/Pagination.type';
import { RechargeTable } from '@/modules/shared/user/application/table/RechargeTable';
import Tabs from '../look/Tabs/Tabs.vue';
import { useDebounce } from '@/sections/shared/mixins/DebounceMixin';
import { GetRechargesUseCase } from '@/modules/shared/user/application/user/GetRechargesUseCase';
import dayjs from 'dayjs';
const showToast = inject<any>('showToast');

const { debounce } = useDebounce();
//Routes
const router = useRouter();
const socketStore = useSocketStore();

//Form
const userData = computed(() => socketStore.userData);
const userProfile = computed(() => socketStore.userProfile);
const steamRedirectUrl = import.meta.env.VITE_BACKEND_BASE_URL + '/auth_steam';
const tradeUrl = computed(() => userProfile.value.tradeUrl);
//Form
// const tradeUrl = ref<string>('');
const loading = ref<boolean>(false);

//Table
const columnCount = computed(() => table.getActiveColumns().length);

const table = RechargeTable.createEmpty();

const pagination = ref<PaginationTableType>({
    pageSize: table.getPaginationPageSize(),
    totalElements: table.getPaginationTotalCount(),
    currentPage: table.getPaginationPage(),
});

//Tabs
const tabs = [
    { id: "tab-1", panelId: "panel-1", label: "Recargas", slotName: "chapter1" },
    { id: "tab-2", panelId: "panel-2", label: "Premios", slotName: "chapter2" },
];

const onRecharge = () => {
    router.push({ name: 'recharge' });
};

const updateProfile = async () => {
    try {
        loading.value = true;
        await UpdateTradeUrlUseCase.invoke(tradeUrl.value);

        showToast({
            title: '',
            message: "Se ha actualizado correctamente",
            type: 'success',
            autoClose: true,
        });

    } catch (error) {
        showToast({
            title: '',
            message: "Ha ocurrido un error al actualizar",
            type: 'error',
            autoClose: true,
        });
    } finally {
        loading.value = false;
    }
}

const status = ['Pendinente', 'Aprobado', 'Rechazado'];

const columnStyle = computed(() => {
    return columnCount.value <= 6
        ? { width: `${100 / columnCount.value}%` }
        : { minWidth: '120px', width: '100px' };
});

const updatePagination = (value: PaginationTableType) => {
    pagination.value = value;
    debounce(async () => {
        getRecharges();
    }, 500)();
}

const handleTabChange = (tabId: string) => {
    console.log(tabId);
}

const getRecharges = async () => {
    try {
        const response = await GetRechargesUseCase.invoke({
            pageSize: pagination.value.pageSize,
            currentPage: pagination.value.currentPage,
        });
        console.log(response);
        table.setData(response.data);
        table.setPagination({
            pageSize: pagination.value.pageSize,
            totalElements: response.totalElements,
            currentPage: pagination.value.currentPage,
        })
        pagination.value = {
            pageSize: pagination.value.pageSize,
            totalElements: response.totalElements,
            currentPage: pagination.value.currentPage,
        }
    } catch (error) {
        console.error(error);
        showToast({
            title: '',
            message: "Error al obtener las recargas",
            type: 'error',
            autoClose: true,
        });
    }
}

const statusColor = ((status: number) => {
    switch (status) {
        case 1:
            return 'text-arcano';
        case 2:
            return 'text-rojo-latam-minus-20';
        default:
            return '';
    }
})

onMounted(() => {
    getRecharges();
});

</script>

<template>
    <div class="perfil mt-80 lg:mt-120">
        <section class="section w-10/12" style="max-width: 500px;">
            <!-- <h4
                class="px-10 py-10 md:py-16 rounded-lg bg-gris-latam-minus-60 d-block md:justify-center md:align-center mb-20 md:d-flex text-center">
                Mi Perfil</h4> -->
            <div class="mx-auto bg-negro-latam mb-16 text-center">
                <div class="w-24 h-24 mb-4">
                    <img v-if="userData.username" loading="lazy" class="aspect-square rounded-full w-full"
                        :src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`" alt="profile">
                    <div v-else class="w-24 h-24 aspect-square rounded-full bg-gris-latam">

                    </div>
                </div>
                <span class="text-base">{{ userData.username }}</span>
            </div>
            <div class="w-full d-flex">
                <div class="w-full">
                    <div class="d-flex w-full justify-evenly align-center mb-10">
                        <div>
                            <div class="text-center fs-5">{{ formatNumber(Number(userData.xp)) }} </div><span
                                class="text-amarillo-latam strong d-block text-center">EXP</span>
                        </div>
                        <div>
                            <div class="d-flex justify-center align-center fs-5">{{ userProfile.coins || 0 }} <img class="ml-4" width="16"
                                    :src="$staticUrl + '/images/latam-coin.webp'" alt="latamcoin"></div><span
                                class="text-amarillo-latam strong">LATAMCOIN</span>
                        </div>
                        <div class="d-none md:d-flex md:w-2/6 btn-gradient skew legendario" @click="onRecharge">
                            Recargar
                        </div>
                    </div>

                    <div class="md:d-none btn-gradient skew legendario" @click="onRecharge">
                        Recargar
                    </div>

                    <!-- <div class="text-center">
                        <button @click="onRecharge" class="btn outline roboto fs-5 mt-10 amarillo">Recargar</button>
                    </div> -->
                </div>
            </div>
            <div class="d-grid gap-3 mt-10 mb-20 md:grid-cols-2">
                <div class="form-control">
                    <label for="username" class="d-block mb-8">Usuario (Discord):</label>
                    <div class="d-flex align-center">
                        <div class="w-full">
                            <input id="username" readonly type="text" name="username" placeholder="Ingresar"
                                :value="userData.username" />
                            <ErrorMessage name="username"></ErrorMessage>
                        </div>
                        <i class="bi bi-check-lg text-verde-light text-2xl text-shadow-verde ml-4 text-stroke"></i>
                    </div>
                </div>
                <div class="form-control">
                    <label for="steamId" class="d-block mb-8">Steam ID:</label>
                    <div class="d-flex align-center">
                        <div class="w-full">
                            <template v-if="userProfile?.steamId">
                                <input id="steamId" readonly type="text" name="steamId" placeholder="Ingresar"
                                    :value="userProfile.steamId" />
                                <ErrorMessage name="steamId"></ErrorMessage>
                            </template>
                            <template v-else>
                                <a :href="steamRedirectUrl"
                                    class="w-full d-flex align-center btn bg-blanco text-negro border-0">
                                    <img :src="$staticUrl + '/images/steam.webp'" width="24" alt="steam">
                                    <span class="fs-6 w-full text-center bold roboto">Conectar con Steam</span>
                                </a>
                            </template>
                        </div>
                        <i :class="{ 'bi-x text-rojo': !userProfile?.steamId, 'bi-check-lg text-verde-light': userProfile?.steamId }"
                            class="bi text-2xl text-shadow-rojo-latam ml-4 text-stroke"></i>
                    </div>
                </div>
                <div class="form-control col-span-2">
                    <label for="tradeUrl" class="d-block mb-8">Trade URL:</label>
                    <div class="d-flex align-center">
                        <div class="w-full">
                            <input id="tradeUrl" type="text" name="tradeUrl" placeholder="Ingresar"
                                v-model="tradeUrl" />
                            <ErrorMessage name="tradeUrl"></ErrorMessage>
                        </div>
                        <i :class="{ 'bi-x text-rojo': !tradeUrl, 'bi-check-lg text-verde-light': tradeUrl }"
                            class="bi text-2xl text-shadow-verde ml-4 text-stroke"></i>
                    </div>
                </div>
            </div>

            <button v-if="!loading && tradeUrl !== userProfile.tradeUrl" @click="updateProfile"
                class="btn btn-fixed md:position-relative md:mx-auto md:w-48 text-blanco roboto">Guardar</button>
            <hr class="border-gris-latam-minus-60">
            <Tabs :tabs="tabs" defaultTabId="tab-1" @change="handleTabChange">
                <template #chapter1>
                    <div class="overflow-visible w-full">
                        <div class="table-container small overflow-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="bold" v-for=" column in table.getActiveColumns()"
                                            :style="columnStyle">{{
                                                column.label }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="small">
                                    <tr v-for="(item) in table.getData()">
                                        <td :style="columnStyle">{{ item.paymentMethod }}</td>
                                        <td :style="columnStyle">{{ item.amount }}</td>
                                        <td :style="columnStyle" :class="statusColor(item.status)">{{ status[item.status!] }}</td>
                                        <td :style="columnStyle">{{ dayjs(item.createdAt).format('DD/MM/YY') }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Pagination class="mt-12" @change="updatePagination" :value="pagination">
                        </Pagination>
                    </div>
                </template>
                <template #chapter2>
                    <h2>Chapter 2 Content</h2>
                    <p>This is the content for Chapter 2. Lorem ipsum dolor sit amet.</p>
                </template>
            </Tabs>
        </section>
    </div>
</template>

<style lang="scss">
@use '@/assets/scss/utils' as *;

.perfil {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    object-fit: fill;
    background-repeat: no-repeat;
    height: 100%;
}
</style>