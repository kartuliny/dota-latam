import { Settings, SettingsState } from "@/sections/shared/store/setting/setting";

export class RouletteSettingResponse implements Settings {
    constructor(
        public readonly settings: SettingsState,
    ) {}
}