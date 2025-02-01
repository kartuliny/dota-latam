<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import Register from './register/Index.vue';
import Edit from './edit/Index.vue';
import { useRouter } from 'vue-router';
import { ChestGroup } from '@/modules/admin/chest/domain/models/ChestGroup';
import { GetChestGroupsUseCase } from '@/modules/admin/chest/application/chestGroup/GetChestGroupsUseCase';

const showToast = inject<any>('showToast');
const showRegister = ref<boolean>(false);
const showEdit = ref<boolean>(false);
const router = useRouter();
const enabled = ref<boolean>(false);
const groups = ref<ChestGroup[]>()

const itemToEdit = ref<ChestGroup>();

const columns = [
    { label: 'Nombre', name: 'name' },
    { label: 'Tipo', name: 'type' },
    { label: 'Habilitado', name: 'enabled' },
    { label: 'Acciones', name: '' },
];

const columnStyle = computed(() => {
    return columns.length <= 6
        ? { width: `${100 / columns.length}%` }
        : { minWidth: '120px', width: '100px' };
});

const editinGroup = (group: ChestGroup) => {
    showEdit.value = true;
    itemToEdit.value = group;
}

onMounted(() => {
    getGroups();
});

const getGroups = async () => {
    try {
        const response = await GetChestGroupsUseCase.invoke();
        groups.value = response;
    } catch (error) {
        showToast({
            title: '',
            message: "Ha ocurrido un error al obtener los grupos",
            type: 'error',
            autoClose: true,
        });
        console.error(error);
    }
}

const onShowTreasures = (group: ChestGroup) => {
    router.push({ name: 'admin-group-detail', params: { id: group._id ?? "xdd" } });
}

const reload = () => {
    showRegister.value = false;
    showEdit.value = false;
    getGroups();
}
</script>

<template>
    <Register v-if="showRegister" @close="showRegister = false" @reload="reload"/>
    <Edit v-if="showEdit" :item="itemToEdit" @close="showEdit = false" @reload="reload"/>
    <div class="container h-100 text-gris-latam">
        <div class="d-flex align-center justify-space-between pb-24 position-sticky pt-40 bg">
            <div class="d-flex align-center">
                <h2>Grupo de cofres</h2>
                <label class="switch ml-20" for="maincheckbox">
                    <input type="checkbox" id="maincheckbox" v-model="enabled" />
                    <div class="slider round"></div>
                </label>
            </div>

            <div>
                <button class="btn submit" @click="showRegister = true">Crear Grupo</button>
                <!-- <button class="btn submit" @click="save">Guardar</button> -->
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
                        <tr v-for="(group) in groups">
                            <td :style="columnStyle">{{ group.name }}</td>
                            <td :style="columnStyle">{{ group.type }}</td>
                            <td :style="columnStyle">
                                {{ group.enabled ? 'Si' : 'No' }}
                            </td>
                            <td :style="columnStyle"><button @click="editinGroup(group)" class="btn outline">
                                    Editar</button>
                                <button class="btn submit ml-20" @click="onShowTreasures(group)">Ver cofres</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>