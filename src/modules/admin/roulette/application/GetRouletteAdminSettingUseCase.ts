import { Settings } from "@/sections/shared/store/setting/setting";
import { ApiRouletteAdminRepository } from "../infrastructure/respositories/ApiRouletteAdminRepository";

export class GetRouletteAdminSettingUseCase {
    constructor() { }

    static async invoke(): Promise<Settings> {
        const repository = new ApiRouletteAdminRepository();
        return await repository.getSetting();
    }
}