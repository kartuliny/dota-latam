import { RouletteaAdminSettingResponse } from "../../infrastructure/responses/RouletteAdminSettingResponse";
import { RouletteAdminItem } from "../models/RouletteAdminItem";

export interface RouletteAdminRepository {
    getSetting: () => Promise<RouletteaAdminSettingResponse>;
    updateSetting: (setting: { [key: string]: any }) => Promise<void>;
    createItem: (item: RouletteAdminItem) => Promise<void>;
    updateItem: (item: RouletteAdminItem) => Promise<void>;
    getItems: () => Promise<RouletteAdminItem[]>;
}