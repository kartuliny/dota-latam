<template>
    <div class="pagination">
        <div v-if="itemName" class="items-name">{{ itemName }}</div>
        <div class="display-number">
            {{ $t('labels.showing') }} {{ pageMin }}-{{ pageMax }} {{ $t('labels.of') }} {{ valueLocal.totalElements }}
        </div>
        <div class="display-buttons">
            <ButtonCircle id="reset-page-size-button" variant="outline-circle" icon="arrow-repeat"
                @click="emitChanges"></ButtonCircle>
            <span class="label-rows">{{ $t('labels.rows') }}</span>
            <input id="pageSize" v-model="pageSize" :readonly="readonlyPageSize"
                :class="['input-number', classReadOnly]" type="number" min="1" @input="validateMax"
                @change="updatePageSize" />
            <span class="separator"></span>

            <ButtonCircle id="first-page-button" variant="outline-circle" icon="chevron-double-left"
                :disabled="isFirstPageNumber" @click="onClickDirection(0)"></ButtonCircle>
            <ButtonCircle id="prev-page-button" variant="outline-circle" icon="chevron-left"
                :disabled="isFirstPageNumber" @click="onClickDirection(-1)"></ButtonCircle>

            <span class="label-page">{{ $t('labels.page') }}</span>
            <input id="currentPage" v-model="currentPage" class="input-number" type="number" min="1"
                :max="lastPageNumber" @change="updateCurrentPage" />
            <span class="separator">/</span>
            <span id="lastPageNumber" class="page-number page-number-right">{{ lastPageNumber }}</span>

            <ButtonCircle id="next-page-button" variant="outline-circle" icon="chevron-right"
                :disabled="isLastPageNumber" @click="onClickDirection(1)"></ButtonCircle>
            <ButtonCircle id="last-page-button" variant="outline-circle" icon="chevron-double-right"
                :disabled="isLastPageNumber" @click="onClickDirection(lastPageNumber)"></ButtonCircle>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ButtonCircle } from '../Button';
import { PaginationTableType } from './Pagination.type';

const props = defineProps<{
    itemName?: string;
    value: PaginationTableType;
    maxPageSize?: number;
    readonlyPageSize?: boolean;
}>();

const emit = defineEmits(['input', 'change']);

const valueLocal = ref<PaginationTableType>({
    pageSize: 20,
    totalElements: 0,
    currentPage: 1,
});

const currentPage = ref(valueLocal.value.currentPage);
const pageSize = ref(valueLocal.value.pageSize);

watch(
    () => props.value,
    (newValue) => {
        valueLocal.value = { ...valueLocal.value, ...newValue };
        pageSize.value = valueLocal.value.pageSize;
        currentPage.value = valueLocal.value.currentPage;
    },
    { immediate: true }
);

watch(
    () => props.value.totalElements,
    (newValue) => {
        valueLocal.value.totalElements = newValue;
    },
    { immediate: true }
);

const classReadOnly = computed(() => (props.readonlyPageSize ? 'readonly' : ''));

const pageMin = computed(() => currentStartingElementCount.value);
const pageMax = computed(() => Math.min(pageMin.value + valueLocal.value.pageSize - 1, valueLocal.value.totalElements));
const lastPageNumber = computed(() => (valueLocal.value.totalElements === 0 ? 1 : Math.ceil(valueLocal.value.totalElements / valueLocal.value.pageSize)));
const currentStartingElementCount = computed(() => {
    if (valueLocal.value.totalElements === 0) return 0;
    return valueLocal.value.currentPage === 1 ? 1 : (valueLocal.value.currentPage - 1) * pageSize.value + 1;
});

const isFirstPageNumber = computed(() => currentPage.value === 1);
const isLastPageNumber = computed(() => currentPage.value === lastPageNumber.value);

const emitChanges = () => {
    emit('input', valueLocal.value);
    emit('change', valueLocal.value);
};

const validateMax = () => {
    if (props.maxPageSize && pageSize.value > props.maxPageSize) {
        pageSize.value = props.maxPageSize;
    }
};

const updatePageSize = () => {
    if (pageSize.value && pageSize.value > 0) {
        valueLocal.value.pageSize = Math.ceil(pageSize.value);
        valueLocal.value.currentPage = 1;
        emitChanges();
    } else {
        pageSize.value = valueLocal.value.pageSize;
    }
};

const updateCurrentPage = () => {
    if (currentPage.value && currentPage.value > 0 && currentPage.value <= lastPageNumber.value) {
        valueLocal.value.currentPage = currentPage.value;
        emitChanges();
    } else {
        currentPage.value = valueLocal.value.currentPage;
    }
};

const onClickDirection = (factor: number) => {
    if (factor === 0) {
        currentPage.value = 1;
    } else if (factor === lastPageNumber.value) {
        currentPage.value = lastPageNumber.value;
    } else if (factor > 0) {
        currentPage.value++;
    } else if (factor < 0) {
        currentPage.value--;
    }
    updateCurrentPage();
};

defineExpose({
    valueLocal,
    emitChanges
})
</script>

<style scoped>
span {
    font-size: 0.8rem;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.display-buttons {
    display: flex;
    align-items: center;
}

.separator {
    margin: 0 7px;
    color: #a5a5a5;
}

.label-page {
    margin: 0 7px;
    color: #a5a5a5;
}

.label-rows {
    margin: 0 7px;
    color: #a5a5a5;
}

.page-number {
    line-height: 1rem;
    color: #4c4c4c;
}

.page-number-right {
    color: #a5a5a5;
}

.current {
    color: #ffd102;
}

.input-number {
    border: none;
    border-radius: 5px;
    width: 35px;
    text-align: center;
    color: #ffd102;
}

.input-number:focus {
    outline: none;
}

/* Chrome, Safari, Edge, Opera */
.input-number::-webkit-outer-spin-button,
.input-number::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.input-number.readonly {
    background-color: transparent;
}

/* Firefox */
.input-number[type="number"] {
    -moz-appearance: textfield;
}

.items-name {
    display: block;
    width: 79px;
    height: 32px;
    margin: 24px 8px 24px 16px;
    object-fit: contain;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.78;
    color: #4c4c4c;
}

.display-number {
    display: flex;
    height: 24px;
    margin: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #a5a5a5;
}

.c-button {
    margin-left: 10px;
}
</style>