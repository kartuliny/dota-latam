<template>
    <button :class="['c-button', getClass]" :disabled="disabled">
      <Icon :icon="icon" :type="iType" :size="iSize" :color="iColor"></Icon>
    </button>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import Icon from '../Icon/Icon.vue';
  
  const props = defineProps<{
    variant?: string;
    disabled?: boolean;
    icon: string;
    iType?: string;
    iSize?: number;
    iColor?: string;
  }>();
  
  const getClass = computed(() => `c-button--${props.variant || 'primary'}`);
  </script>
  
  <style scoped>
  .c-button {
    background-color: #fed030;
    border: none;
    padding: 0;
    color: #555348;
    font-weight: 600;
    border-radius: 2rem;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    display: flex;
  }
  .c-button svg {
    margin: 0.5rem;
  }
  .c-button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .c-button:not([disabled]):hover {
    background-color: #e0b92c;
  }
  .c-button--outline-circle {
    background-color: white;
    color: #605e5e;
    border: 1px solid #e8e8e8;
    font-weight: 400;
  }
  .c-button--outline-circle:not([disabled]):hover {
    background-color: #eeeeee;
  }
  
  .c-button--gray-circle {
    background-color: #e1e1e1;
    color: #747374;
    font-weight: 400;
  }
  
  .c-button--gray-circle:not([disabled]):hover {
    background-color: #d7d7d7;
  }
  </style>
  