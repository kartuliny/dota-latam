<template>
    <transition-group name="toast-fade" class="toast-container" tag="div">
        <div v-for="toast in props.toasts" :key="toast.id" :class="['toast', `toast-${toast.type}`]"
            @click="removeToast(toast.id)">
            <div class="toast-header">
                <i :class="getIconClass(toast.type)"></i>
                <div class="toast-body">{{ toast.message }}</div>
                <i class="bi bi-x-lg btn-close" @click.stop="removeToast(toast.id)"></i>
            </div>
        </div>
    </transition-group>
</template>

<script setup lang="ts">

interface Toast {
    id: number;
    type: string;
    title: string;
    message: string;
    autoClose: boolean;
}

const props = defineProps<{ toasts: Toast[] }>();

const removeToast = (id: number) => {
    const index = props.toasts.findIndex(toast => toast.id === id);
    if (index !== -1) {
        props.toasts.splice(index, 1);
    }
};

const getIconClass = (type: string) => {
    switch (type) {
        case 'success':
            return 'bi bi-check-circle';
        case 'error':
            return 'bi bi-x-circle';
        case 'warning':
            return 'bi bi-exclamation-circle';
        case 'info':
        default:
            return 'bi bi-info-circle';
    }
};
</script>

<style scoped>
.toast-container {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999999;
}

.toast {
    position: relative;
    animation: slideIn 0.5s ease forwards;

    width: 560px;
    height: 48px;
    margin: 12px;
    padding: 16px;
    object-fit: contain;
    border-radius: 24px;
    box-shadow: 0 9px 27px 0 rgba(0, 0, 0, 0.15);
    border: solid 1px #ffd102;
    background-color: #fffae1;
    font-size: 14px;
    color: #4c4c4c;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
    transition: opacity 0.5s;
}

.toast-fade-enter,
.toast-fade-leave-to {
    opacity: 0;
}

.btn-close {
    position: absolute;
    right: 20px;
    top: 40%;
    cursor: pointer;
}

.toast-header {
    width: 100%;
    display: flex;
}

.toast-body {
    margin-left: 10px;
}

.toast-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
}

.toast-error {
    background-color: #f8d7da;
    border-color: #f5c6cb;
}

.toast-warning {
    background-color: #fff3cd;
    border-color: #ffeeba;
}

.toast-info {
    background-color: #d1ecf1;
    border-color: #bee5eb;
}

@keyframes slideIn {
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
}
</style>