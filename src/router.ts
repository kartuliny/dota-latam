import { createRouter, createWebHistory } from "vue-router";
import SignInVerify from "@/sections/sign/SignInVerify.vue";
import MainLayoutNav from "./sections/shared/layout/MainLayoutNav.vue";
import Home from '@/sections/home/Index.vue';
import AdminHome from '@/sections/admin/Index.vue';
import AdminRuleta from '@/sections/admin/ruleta/config/Index.vue';
import AdminRuletaItems from '@/sections/admin/ruleta/list/Index.vue';
import AdminXPHistory from '@/sections/admin/xp/history/Index.vue';
import SignIn2 from "./sections/sign/SignIn2.vue";
import Ruleta from "./sections/roulette/Index.vue";
import Ruleta2 from "./sections/Ruleta2.vue";
import Ruleta3 from "./sections/Ruleta3.vue";
import RegisterRuleta from "./sections/RegisterRuleta.vue";
import MainLayoutAdmin from "./sections/shared/layout/MainLayoutAdmin.vue";
import RuletaPro from "./sections/shared/look/Roulette/Index.vue";
import axios from "axios";

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
                },
                {
                    path: "ruleta",
                    name: "ruleta",
                    component: Ruleta,
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
                    meta: { requiresAuth: true, roles: ['admin', 'history'] },
                    component: AdminHome,
                },
                {
                    path: "ruleta",
                    name: "admin-ruleta",
                    meta: { requiresAuth: true, roles: ['admin'] },
                    component: AdminRuleta,
                },
                {
                    path: "ruleta-lista",
                    name: "admin-ruleta-items",
                    meta: { requiresAuth: true, roles: ['admin'] },
                    component: AdminRuletaItems,
                },
                {
                    path: "xp-history",
                    name: "admin-xp-history",
                    component: AdminXPHistory,
                    meta: { requiresAuth: true, roles: ['admin', 'history'] },
                }
            ]
        },
        {
            path: "/sign-in",
            name: "signin",
            component: SignIn2,
        },
        {
            path: "/login/callback",
            name: "callback",
            component: SignInVerify,
        },
        {
            path: "/ruleta2",
            name: "ruleta2",
            component: Ruleta2,
        },
        {
            path: "/ruleta-pro",
            name: "ruleta-pro",
            component: RuletaPro,
        },
        {
            path: "/ruleta3",
            name: "ruleta3",
            component: Ruleta3,
        },
        {
            path: "/registro-ruleta",
            name: "registroRuleta",
            component: RegisterRuleta,
        }
    ],
});
router.beforeEach(async (to, from, next) => {
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
});
