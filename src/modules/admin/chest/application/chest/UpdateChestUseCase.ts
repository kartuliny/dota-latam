import { MoneyType } from "../../domain/models/Chest";
import { ApiChestRepository } from "../../infrastructure/repositories/ApiChestRepository";

export class UpdateChestUseCase {
    constructor() { }

    static async invoke(params: UpdateChestParams): Promise<void> {
        const repository = new ApiChestRepository();
        return repository.updateChest(params);
    }
}

export interface UpdateChestParams {
    _id: string;
    name?: string;
    showDropRate?: boolean;
    backgroundImageUrl?: File | undefined;
    backgroundImageUrlOld?: string;
    contentImageUrl?: File | undefined;
    contentImageUrlOld?: string;
    moneyType?: MoneyType;
    moneyValue?: number;
    enabled?: boolean;
}