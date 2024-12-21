import { get } from "http";
import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
    state: (): SettingsState => ({
        types: {} as Types,
        enabled: false
    }),
    actions: {
        setSetting(setting: SettingsState) {
            this.$patch({
                types: setting.types,
                enabled: setting.enabled,
            })
        },
        getSetting() {
            return this.$state;
        }
    },
    persist: {
        key: "settings",
        storage: localStorage
    },
});

type Probabilities = {
    '1': number;
    '2': number;
    '3': number;
};

export type Tier = {
    [key: string]: any;
    probabilities: Probabilities;
    name: string;
    itemQuantity: number;
    maxWin: number;
    xp: number;
    enabled: boolean;
};

export type Types = {
    tier_1: Tier;
    tier_2: Tier;
    tier_3: Tier;
};

export type SettingsState = {
    types?: Types;
    enabled: boolean;
};

export type Settings = {
    settings: SettingsState;
}

export type SettingsStateView = {
    types?: Tier[];
    enabled: boolean;
}
