<script setup lang="ts">
import { onMounted, ref } from 'vue';

export interface Page {
    name: string;
    path: string;
    icon: string;
}

const pages = ref<Page[]>([]);

const renderSidebar = () => {
    const role = JSON.parse(localStorage.getItem('role') || 'null');
    console.log("Role", role === "admin");

    if (!role) {
        console.error("Role not found in localStorage");
        return;
    }

    if (role === 'admin') {
        console.log("Admin");
        pages.value = [
            { name: 'Inicio', path: '', icon: 'bi bi-house-fill' },
            { name: 'Grupos Cofres', path: 'groups', icon: 'bi bi-bullseye' },
            { name: 'Cofres', path: 'ruleta-cofres', icon: 'bi bi-box-seam-fill' },
            { name: 'Items', path: 'ruleta-lista', icon: 'bi bi-card-checklist' },
            { name: 'Historial XP', path: 'xp-history', icon: 'bi bi-card-checklist' },
        ];
    } else if (role === 'history') {
        console.log("History");
        pages.value = [
            { name: 'Inicio', path: '', icon: 'bi bi-house-fill' },
            { name: 'Historial XP', path: 'xp-history', icon: 'bi bi-card-checklist' },
        ];
    } else {
        console.log("Unknown role");
    }
};

onMounted(async () => {
    renderSidebar();
    removeTheme();
})

const removeTheme = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.hasAttribute('latam-theme')) {
        htmlElement.removeAttribute('latam-theme');
    }
}

</script>
<template>
    <div class="admin-layout">
        <div class="admin-layout__sidebar">
            <a class="admin-sidebar__trigger" href="#0">
                <i class="fa fa-bars"></i>
            </a>
            <nav class="admin-sidebar__nav">
                <ul>
                    <li v-for="page in pages">
                        <a class="admin-sidebar__nav-link" :href="`/admin/` + page.path">
                            <i :class="page.icon"></i><em>{{ page.name }}</em>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <main class="admin-layout__content">
            <router-view />
        </main>
    </div>
</template>