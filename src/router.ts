import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import SignInVerify from "@/sections/sign/SignInVerify.vue";
import MainLayoutNav from "./sections/shared/layout/MainLayoutNav.vue";
import Home from '@/sections/home/Index.vue';
import AdminHome from '@/sections/admin/Index.vue';
import AdminRuleta from '@/sections/admin/ruleta/config/Index.vue';
import AdminRuletaItems from '@/sections/admin/ruleta/list/Index.vue';
import AdminXPHistory from '@/sections/admin/xp/history/Index.vue';
import SignIn2 from "./sections/sign/SignIn2.vue";
import Ruleta from "./sections/roulette/Index.vue";
import MaintenancePage from "@/sections/maintenance/Index2.vue";
import RegisterRuleta from "./sections/RegisterRuleta.vue";
import MainLayoutAdmin from "./sections/shared/layout/MainLayoutAdmin.vue";
import RuletaPro from "./sections/shared/look/Roulette/Index.vue";
import axios from "axios";
import NotFound from "@/sections/NotFound.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "root",
            component: MainLayoutNav,
            redirect: "/",
            children: [
                {
                    path: "",
                    name: "home",
                    component: Home,
                    meta: {
                        title: "Inicio - Dota2 Latam",
                        description: "Bienvenido a la comunidad de Dota 2 en Latinoamérica. Noticias, guías y mucho más."
                    }
                },
                {
                    path: "ruleta",
                    name: "ruleta",
                    component: Ruleta,
                    meta: {
                        title: "Ruleta - Dota2 Latam",
                        description: "Juega y gana con la ruleta de Dota 2. ¡Diversión y premios garantizados!"
                    }
                },
            ]
        },
        {
            path: "/admin",
            name: "admin",
            component: MainLayoutAdmin,
            redirect: "/admin",
            children: [
                {
                    path: "",
                    name: "admin-home",
                    meta: {
                        requiresAuth: true,
                        roles: ['admin', 'history'],
                        title: "Panel de Administración - Dota2 Latam",
                        description: "Administración de usuarios, roles y datos de Dota 2."
                    },
                    component: AdminHome,
                },
                {
                    path: "ruleta",
                    name: "admin-ruleta",
                    meta: {
                        requiresAuth: true,
                        roles: ['admin'],
                        title: "Configuración de Ruleta - Admin",
                        description: "Configura las reglas y premios de la ruleta en Dota 2."
                    },
                    component: AdminRuleta,
                },
                {
                    path: "ruleta-lista",
                    name: "admin-ruleta-items",
                    meta: {
                        requiresAuth: true,
                        roles: ['admin'],
                        title: "Lista de Items - Admin",
                        description: "Consulta y gestiona los premios de la ruleta de Dota 2."
                    },
                    component: AdminRuletaItems,
                },
                {
                    path: "xp-history",
                    name: "admin-xp-history",
                    component: AdminXPHistory,
                    meta: {
                        requiresAuth: true,
                        roles: ['admin', 'history'],
                        title: "Historial de XP - Admin",
                        description: "Consulta el historial de XP de los usuarios en Dota 2."
                    },
                }
            ]
        },
        {
            path: "/sign-in",
            name: "signin",
            component: SignIn2,
            meta: {
                title: "Iniciar sesión - Dota2 Latam",
                description: "Accede a tu cuenta de Dota 2 para participar en la comunidad y eventos."
            }
        },
        {
            path: "/login/callback",
            name: "callback",
            component: SignInVerify,
            meta: {
                title: "Verificación de inicio de sesión - Dota2 Latam",
                description: "Verifica tu cuenta para comenzar a disfrutar de los beneficios de Dota 2."
            }
        },
        {
            path: "/ruleta-pro",
            name: "ruleta-pro",
            component: RuletaPro,
            meta: {
                title: "Ruleta Profesional - Dota2 Latam",
                description: "Accede a la ruleta profesional y participa en los eventos exclusivos."
            }
        },
        {
            path: "/registro-ruleta",
            name: "registroRuleta",
            component: RegisterRuleta,
            meta: {
                title: "Registro de Ruleta - Dota2 Latam",
                description: "Regístrate para participar en la ruleta de Dota 2 y ganar premios."
            }
        },
        {
            path: '/mantenimiento',
            name: 'mantenimiento',
            component: MaintenancePage,
            meta: {
                title: "Mantenimiento - Dota2 Latam",
                description: "El sitio se encuentra en mantenimiento. ¡Vuelve pronto!"
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound,
            meta: {
                title: "Página no encontrada - Dota2 Latam",
                description: "La página que buscas no existe o está en proceso. ¡Vuelve pronto!"
            }
        },
    ],
});

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (to.meta.title) {
        document.textContent = to.meta.title as string;
    } else {
        document.title = "Dota2 Latam";
    }

    const isMaintenanceMode = import.meta.env.VITE_MANTENIMIENTO === 'true';

    if (isMaintenanceMode && to.name !== 'mantenimiento') {
        next({ name: 'mantenimiento' }); // Redirige al modo mantenimiento
    } else {

        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta && to.meta.description) {
            descriptionMeta.setAttribute("content", to.meta.description as string);
        }

        const ogTitleMeta = document.querySelector('meta[property="og:title"]');
        if (ogTitleMeta && to.meta.title) {
            ogTitleMeta.setAttribute("content", to.meta.title as string);
        }

        const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
        if (ogDescriptionMeta && to.meta.description) {
            ogDescriptionMeta.setAttribute("content", to.meta.description as string);
        }

        if (to.matched.some(record => record.meta.requiresAuth)) {
            try {
                const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
                const { data } = await axios.get(`${baseUrl}/api/profile/roles`, { withCredentials: true });
                localStorage.setItem('role', JSON.stringify(data.role));
                if (to.meta.roles && !(to.meta.roles as string[]).includes(data.role)) {
                    return next({ name: 'home' });
                }

                next();
            } catch (error) {
                console.error("Error al verificar los roles", error);

                return next({ name: 'signin' });
            }
        } else {
            next();
        }
    }
});