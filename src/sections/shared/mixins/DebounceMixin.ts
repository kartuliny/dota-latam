import { ref } from 'vue';

export function useDebounce() {
  const timeout = ref<NodeJS.Timeout | null>(null);

  function debounce(fn: (...args: any[]) => void, delay = 500) {
    return (...args: any[]) => {
      if (timeout.value) {
        clearTimeout(timeout.value);
      }
      timeout.value = setTimeout(() => {
        timeout.value = null;
        fn(...args);
      }, delay);
    };
  }

  return {
    debounce
  };
}