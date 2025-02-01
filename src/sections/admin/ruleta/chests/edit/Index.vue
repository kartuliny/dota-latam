<script setup lang="ts">
import Modal from '@/sections/shared/look/Modal/Modal.vue';
import { inject, onMounted, ref } from 'vue';
import { Chest, MoneyType } from '@/modules/admin/chest/domain/models/Chest';
import { UpdateChestParams, UpdateChestUseCase } from '@/modules/admin/chest/application/chest/UpdateChestUseCase';

const props = defineProps<{
    item: Chest;
}>();

const chest = ref<UpdateChestParams>({
    _id: '',
    name: '',
    showDropRate: false,
    backgroundImageUrl: undefined,
    backgroundImageUrlOld: '',
    contentImageUrl: undefined,
    contentImageUrlOld: '',
    moneyType: MoneyType.LATAMCOIN,
    moneyValue: 0,
    enabled: true,
});

const emit = defineEmits(['close', 'reload']);
const showToast = inject<any>('showToast');

const fileInput = ref<HTMLInputElement | null>(null)
const fileInput2 = ref<HTMLInputElement | null>(null)

const moneyTypes = [
    { name: 'Latam Coins', value: 'latamcoin' },
    { name: 'XP', value: 'xp' }
];

const update = async () => {
    try {
        await UpdateChestUseCase.invoke(chest.value);

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

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        chest.value.contentImageUrl = target.files[0];
    }
};

const onFileChange2 = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        chest.value.backgroundImageUrl = target.files[0];
    }
};

const openFilePicker = () => {
    if (fileInput.value instanceof HTMLInputElement) {
        fileInput.value.click();
    }
};

const openFilePicker2 = () => {
    if (fileInput2.value instanceof HTMLInputElement) {
        fileInput2.value.click();
    }
};

const submit = () => {
    update();
}

onMounted(() => {
    chest.value = { 
        ...props.item,
        backgroundImageUrlOld: props.item.backgroundImageUrl ?? '',
        contentImageUrlOld: props.item.contentImageUrl ?? '',
        backgroundImageUrl: undefined,
        contentImageUrl: undefined,
        _id: props.item._id!
     };
})

</script>

<template>
    <Modal width="40vw" padding="4rem 2rem" height="80vh" :showFooter="false" @close="emit('close')" @submit="submit">
        <div class="mb-24 position-relative d-flex align-items-center justify-space-between" slot="title">
            <h4>Editar cofre</h4>
            <div class="d-flex align-center">
                <label class="text-gris-latam" for="enabled">Habilitado?</label>
                <label class="switch ml-20" for="enabled">
                    <input type="checkbox" id="enabled" v-model="chest.enabled" />
                    <div class="slider round"></div>
                </label>
            </div>
        </div>
        <div class="register">
            <div class="input-group">
                <label for="name">Nombre</label>
                <input id="name" name="name" type="text" placeholder="Ingresar" v-model="chest.name">
                <!-- <ErrorMessage name="version"></ErrorMessage> -->
            </div>
            <div class="input-group">
                <label for="price">Precio de cofre</label>
                <input id="price" name="price" type="number" placeholder="Ingresar" v-model="chest.moneyValue">
            </div>
            <div class="input-group mb-20 col-span-2">
                <label for="fileInput2">Imagen de cofre</label>
                <input id="fileInput2" type="file" accept=".png,.webp" @change="onFileChange2" ref="fileInput2"
                    style="display: none;" />
                <div class="file-input-wrapper" :class="{ 'with-file': chest.backgroundImageUrl }">
                    <div class="file-input-button" @click="openFilePicker2">
                        {{ chest.backgroundImageUrl ? 'Cambiar' : 'Seleccionar' }}
                    </div>
                    <span>{{ chest.backgroundImageUrl ? chest.backgroundImageUrl.name : 'Elige imagen' }}</span>
                </div>
                <div><img :src="$staticBackUrl+'/'+chest.backgroundImageUrlOld" alt="backgroundImageUrl" width="60"></div>
            </div>
            <div class="input-group mb-20 col-span-2">
                <label for="fileInput">Imagen de contenido</label>
                <input id="fileInput" type="file" accept=".png,.webp" @change="onFileChange" ref="fileInput"
                    style="display: none;" />
                <div class="file-input-wrapper" :class="{ 'with-file': chest.contentImageUrl }">
                    <div class="file-input-button" @click="openFilePicker">
                        {{ chest.contentImageUrl ? 'Cambiar' : 'Seleccionar' }}
                    </div>
                    <span>{{ chest.contentImageUrl ? chest.contentImageUrl.name : 'Elige imagen' }}</span>
                </div>
                <div><img :src="$staticBackUrl+'/'+chest.contentImageUrlOld" alt="contentImageUrl" width="60"></div>
            </div>
            <div class="input-group">
                <label for="moneyType">Tipo Moneda</label>
                <select id="moneyType" name="moneyType" v-model="chest.moneyType">
                    <option v-for="type in moneyTypes" :value="type.value">{{ type.name }}</option>
                </select>
                <!-- <ErrorMessage name="version"></ErrorMessage> -->
            </div>
            <div class="position-relative d-flex align-center">
                <label class="text-gris-latam" for="enabled">Mostrar Porcentajes?</label>
                <label class="switch ml-20" for="maincheckbox">
                    <input type="checkbox" id="maincheckbox" v-model="chest.showDropRate" />
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

<style lang="scss" scoped>
.register {
    display: grid;
    gap: 24px;
    margin-bottom: 20px;
    grid-template-columns: 1fr 1fr !important;
}
</style>