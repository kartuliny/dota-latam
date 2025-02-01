import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $staticUrl: string;
    $staticBackUrl: string;
  }
}