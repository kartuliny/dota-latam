import { App, createApp, h, ref } from 'vue';
import Toast from './Toast.vue';

interface ToastOptions {
    type: string;
    title: string;
    message: string;
    autoClose: boolean;
}

interface Toast extends ToastOptions {
    id: number;
}

const toasts = ref<Toast[]>([]);

const showToast = ({ type, title, message, autoClose = true }: ToastOptions) => {
    const id = Date.now();
    toasts.value.push({ id, type, title, message, autoClose });
    if (autoClose) {
        setTimeout(() => {
            removeToast(id);
        }, 3500);
    }
};

const removeToast = (id: number) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index !== -1) {
        toasts.value.splice(index, 1);
    }
};

const ToastContainer = {
    setup() {
        return () => h(Toast, { toasts: toasts.value });
    },
};

const toastPlugin = {
    install(app: App) {
        app.provide('showToast', showToast);

        const container = document.createElement('div');
        document.body.appendChild(container);
        createApp(ToastContainer).mount(container);
    },
};

export default toastPlugin;