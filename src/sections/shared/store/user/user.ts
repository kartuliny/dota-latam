import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: (): UserState => ({
        user: null,
        isSignedIn: false,
    }),
    actions: {
        loadFromStorage() {
            console.log("loadFromStorage");
            const userData = localStorage.getItem("user");
            if (userData) {
                console.log("userData", userData);
                const parsedUser = JSON.parse(userData);
                console.log("parsedUser", parsedUser);
                this.user = parsedUser.user; // Asignamos directamente el objeto 'user'
                this.isSignedIn = true;
            }
        },

        setUser(user: User) {
            console.log("setUser", user);
            this.user = user;
            this.isSignedIn = true;
            this.saveToStorage();
        },

        saveToStorage() {
            console.log("saveToStorage");
            if (this.user) {
                console.log("this.user", this.user);
                localStorage.setItem("user", JSON.stringify(this.user)); // Guardamos solo el objeto 'user'
            }
        },

        logout() {
            this.user = null;
            this.isSignedIn = false;
            localStorage.removeItem("user");
        },
    },
    persist: true,
});

type UserState = {
    isSignedIn: boolean;
    user: User | null;
};

type User = {
    id: string;
    username: string;
    avatar: string;
    discriminator?: string;
    public_flags?: number;
    flags?: number;
    banner?: string;
    accent_color?: number;
    global_name?: string;
    banner_color?: string;
    clan?: string | null;
    mfa_enabled?: boolean;
    locale?: string;
    premium_type?: number;
};
