import { Settings } from "@/sections/shared/store/setting/setting";
import { ApiRouletteRepository } from "../infrastructure/ApiRouletteRepository";

export class GetRouletteSettingUseCase {
    constructor() { }

    static async invoke(): Promise<Settings> {
        const repository = new ApiRouletteRepository();
        return await repository.getSetting();
    }
}