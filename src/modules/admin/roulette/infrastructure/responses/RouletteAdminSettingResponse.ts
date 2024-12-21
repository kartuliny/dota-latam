import { Settings, SettingsState } from "@/sections/shared/store/setting/setting";

export class RouletteaAdminSettingResponse implements Settings {
    constructor(
        public readonly settings: SettingsState,
    ) {}
}