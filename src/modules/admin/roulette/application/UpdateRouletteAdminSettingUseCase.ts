import { ApiRouletteAdminRepository } from "../infrastructure/respositories/ApiRouletteAdminRepository";

export class UpdateRouletteAdminSettingUseCase {
    constructor() { }

    static async invoke(params: { [key: string]: any }): Promise<void> {
        const repository = new ApiRouletteAdminRepository();
        await repository.updateSetting(params);
    }
}