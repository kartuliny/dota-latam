<script setup lang="ts">
import { GetRouletteAdminSettingUseCase } from '@/modules/admin/roulette/application/GetRouletteAdminSettingUseCase';
import { UpdateRouletteAdminSettingUseCase } from '@/modules/admin/roulette/application/UpdateRouletteAdminSettingUseCase';
import { Tier, useSettingStore } from '@/sections/shared/store/setting/setting';
import { inject, onMounted, ref, watch } from 'vue';

const showToast = inject<any>('showToast');
const settingStore = useSettingStore()
const types = ref<Tier[]>([]);
const oldTypes = ref<Tier[]>([]);
const enabled = ref<boolean>();
const changedValues = ref<{ [key: string]: any }>({});

const initializeTypes = () => {
    const result = Object.entries(settingStore.types!).map(([key, value]) => ({
        key,
        ...value
    }));

    types.value = result.map(item => ({ ...item }));

    types.value = result;
    oldTypes.value = JSON.parse(JSON.stringify(result));

    const config = settingStore.getSetting();
    enabled.value = config.enabled
};

onMounted(() => {
    initializeTypes();
})

const toPercentage = (value: number): number => {
    //redondear 2 decimales
    return Number((Math.round(value * 100 * 100) / 100).toFixed(2));
};

const toRealValue = (value: number): number => {
    return Number((value / 100).toFixed(2));
};

const updateProbability = (roulette: Tier, index: 1 | 2, percentage: Event) => {
    const newValue = toRealValue(Number((percentage.target as HTMLInputElement).value)); // Convertir porcentaje a valor real
    roulette.probabilities[index] = newValue;

    const total = roulette.probabilities[1] + roulette.probabilities[2];
    if (total > 1) {
        roulette.probabilities[index] -= total - 1;
    }

    roulette.probabilities[3] = Number((Math.max(0, 1 - roulette.probabilities[1] - roulette.probabilities[2])).toFixed(2));
};

const calculateLastProbability = (roulette: Tier): number => {
    const total = roulette.probabilities[1] + roulette.probabilities[2];
    return Number(Math.max(1 - total, 0).toFixed(2));
};

const registerChange = (path: string, value: any) => {
    changedValues.value[path] = value;
};

const isValueChanged = (newValue: any, oldValue: any) => {
    return newValue !== oldValue;
};

const isObjectEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
};

watch(enabled, (newValue, oldValue) => {
    if (oldValue === undefined) return;
    if (isValueChanged(newValue, oldValue)) {
        registerChange('enabled', newValue);
    }
});

watch(types, (newTypes) => {

    if (isObjectEmpty(oldTypes)) return;

    newTypes.forEach((roulette, index) => {
        if (isValueChanged(roulette.name, oldTypes.value[index]?.name)) {
            registerChange(`types.tier_${index + 1}.name`, roulette.name);
        }
        if (isValueChanged(roulette.maxWin, oldTypes.value[index]?.maxWin)) {
            registerChange(`types.tier_${index + 1}.maxWin`, Number(roulette.maxWin));
        }
        if (isValueChanged(roulette.xp, oldTypes.value[index]?.xp)) {
            registerChange(`types.tier_${index + 1}.xp`, Number(roulette.xp));
        }
        if (isValueChanged(roulette.itemQuantity, oldTypes.value[index]?.itemQuantity)) {
            registerChange(`types.tier_${index + 1}.itemQuantity`, Number(roulette.itemQuantity));
        }
        if (isValueChanged(roulette.enabled, oldTypes.value[index]?.enabled)) {
            registerChange(`types.tier_${index + 1}.enabled`, roulette.enabled);
        }

        if (isValueChanged(roulette.probabilities[1], oldTypes.value[index]?.probabilities[1])) {
            registerChange(`types.tier_${index + 1}.probabilities.1`, Number(roulette.probabilities[1]));
        }
        if (isValueChanged(roulette.probabilities[2], oldTypes.value[index]?.probabilities[2])) {
            registerChange(`types.tier_${index + 1}.probabilities.2`, Number(roulette.probabilities[2]));
        }
        if (isValueChanged(roulette.probabilities[3], oldTypes.value[index]?.probabilities[3])) {
            registerChange(`types.tier_${index + 1}.probabilities.3`, Number(roulette.probabilities[3]));
        }
    });
}, { deep: true });

const save = async () => {
    try {
        await UpdateRouletteAdminSettingUseCase.invoke(changedValues.value);
        const response = await GetRouletteAdminSettingUseCase.invoke()
        settingStore.setSetting(response.settings);

        initializeTypes();
        showToast({
            title: '',
            message: "Se ha guardado correctamente",
            type: 'success',
            autoClose: true,
        });
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
</script>

<template>
    <div class="container h-100">
        <div class="d-flex align-items-center justify-content-space-between pb-24 position-sticky pt-40 bg">
            <div class="d-flex align-items-center">
                <h2>Ruleta</h2>
                <label class="switch ml-20" for="maincheckbox">
                    <input type="checkbox" id="maincheckbox" v-model="enabled" />
                    <div class="slider round"></div>
                </label>
            </div>

            <div>
                <button class="btn submit" @click="save">Guardar</button>
            </div>
        </div>
        <div class="pb-60">
            <div class="mt-40" v-for="(roulette, index) in types" :key="index">
                <div class="mb-20">Ruleta # {{ index + 1 }}</div>
                <div class="d-grid border border-radius-10 p-16">
                    <div class="form-control">
                        <label :for="`name-` + index">Nombre</label>
                        <input :id="`name-` + index" type="text" placeholder="Nombre de ruleta" v-model="roulette.name">
                    </div>

                    <div class="form-control">
                        <label :for="`maxWin` + index">Ganadores máximos</label>
                        <input :id="`maxWin` + index" type="text" placeholder="Maximo ganadores"
                            v-model="roulette.maxWin">
                    </div>

                    <div class="form-control">
                        <label :for="`xp` + index">Experiencia</label>
                        <input :id="`xp` + index" type="text" placeholder="Experiencia" v-model="roulette.xp">
                    </div>

                    <div class="form-control">
                        <label :for="`itemQuatity` + index">Cantidad de items</label>
                        <input :id="`itemQuantity` + index" type="text" placeholder="Cantidad"
                            v-model="roulette.itemQuantity">
                    </div>

                    <div class="form-control">
                        <div>
                            <span class="fs-5">Habilitado</span>
                        </div>
                        <label class="switch d-flex mx-auto mt-20" :for="`checkbox` + index">
                            <input type="checkbox" v-model="roulette.enabled" :id="`checkbox` + index" />
                            <div class="slider round"></div>
                        </label>
                    </div>

                    <div>
                        <div class="form-control">
                            <label :for="`probability-1-` + index">Probabilidad Item Tier 1</label>
                            <input :id="`probability-1-` + index" type="number" min="0" max="100" placeholder="Cantidad"
                                :value="toPercentage(roulette.probabilities[1])"
                                @input="updateProbability(roulette, 1, $event)" />
                        </div>
                        <div class="form-control">
                            <label :for="`probability-2-` + index">Probabilidad Item Tier 2</label>
                            <input :id="`probability-2-` + index" type="number" min="0" max="100" placeholder="Cantidad"
                                :value="toPercentage(roulette.probabilities[2])"
                                @input="updateProbability(roulette, 2, $event)" />
                        </div>
                        <div class="form-control">
                            <label :for="`probability-3-` + index">Probabilidad Item Tier 3</label>
                            <input :id="`probability-3-` + index" type="number" readonly
                                :value="toPercentage(calculateLastProbability(roulette))" placeholder="Cantidad" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>