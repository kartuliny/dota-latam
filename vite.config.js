import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3001,
        proxy: {
            "^/api": {
                target: "http://localhost:8080",
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        }
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
        APP_NAME: JSON.stringify(process.env.npm_package_name),
    }
});
