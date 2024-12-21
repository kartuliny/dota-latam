<template>
    <span v-if="type === 'bootstrap'" id="icon-bootstrap">
      <i :class="`bi bi-${icon}`"></i>
    </span>
  
    <div v-else-if="helpComp" class="container-help-p-icon">
      <div v-for="key in iconsApp" :key="key" class="item-help-p-icon">
        <span>
          <i :class="`bi bi-${key}`" :style="iconStyle"></i>
        </span>
        <span>
          {{ key }}
        </span>
      </div>
    </div>
  
    <span v-else id="icon-component">
      <i :class="`bi bi-${icon}`"></i>
      <slot></slot>
    </span>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  const props = defineProps<{
    icon: string;
    type?: string;
    color?: string;
    size?: number;
    help?: boolean;
  }>();
  
  const helpComp = computed(() => props.help === true);
  
  const iconsApp = [
    'alarm', 'arrow-up', 'bag', 'bell', 'check', 'heart', 'star', 'x', // etc.
  ];
  
  const iconStyle = computed(() => `color: ${props.color}; font-size: ${props.size}px;`);
  </script>
  
  <style scoped>
  #icon-component {
    width: 12px;
    height: 12px;
    margin: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  i {
    display: flex;
    font-size: 0.9rem;
  }
  
  .container-help-p-icon {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .item-help-p-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 20%;
    margin-top: 20px;
  }
  </style>
  