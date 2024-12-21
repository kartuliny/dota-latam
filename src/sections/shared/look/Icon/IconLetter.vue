<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "#323232",
  },
  background: {
    type: String,
    default: "#d7b000",
  },
  border: {
    type: String,
    default: "#323232",
  },
  size: {
    type: Number,
    default: 26,
  },
});
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="-5 -5 110 110" class="svg-icon">
    <g :fill="background" fill-rule="nonzero">
      <circle cx="50" cy="50" r="50" :stroke="border" stroke-width="4px" />
      <text
        x="45%"
        y="50%"
        :fill="color"
        font-weight="500"
        font-size="40"
        dominant-baseline="middle"
        text-anchor="middle"
      >
        <slot>{{ "S" }}</slot>
      </text>
    </g>
  </svg>
</template>
