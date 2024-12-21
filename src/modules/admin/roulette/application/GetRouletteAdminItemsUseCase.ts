import { RouletteAdminItem } from "../domain/models/RouletteAdminItem";
import { ApiRouletteAdminRepository } from "../infrastructure/respositories/ApiRouletteAdminRepository";

export class GetRouletteAdminItemsUseCase {
    constructor() { }

    static async invoke(): Promise<RouletteAdminItem[]> {
        const repository = new ApiRouletteAdminRepository();
        return await repository.getItems();
    }
}