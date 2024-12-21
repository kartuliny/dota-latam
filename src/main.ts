import { createApp } from 'vue';
import './style.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/scss/elements/_index.scss"
import "@/assets/scss/globals/_index.scss"
import toastPlugin from "./utils/plugins/toast/ToastPlugin";
import loadingDirective from "./utils/directives/Loading";

import { router } from "./router";
import { i18n } from './i18n';
import App from './sections/App.vue';
import { store } from "./store";

const app = createApp(App).use(router).use(i18n).use(store);
app.use(toastPlugin);
app.directive('loading', loadingDirective);
app.mount('#app');