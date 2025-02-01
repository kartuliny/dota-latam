import { MoneyType } from "../../domain/models/Chest";
import { ApiChestRepository } from "../../infrastructure/repositories/ApiChestRepository";

export class StoreChestUseCase {
    constructor() { }

    static async invoke(params: StoreChestParams): Promise<void> {
        const repository = new ApiChestRepository();
        return await repository.storeChest(params);
    }
}

export interface StoreChestParams {
    name: string;
    showDropRate: boolean;
    backgroundImageUrl: File | undefined;
    contentImageUrl: File | undefined;
    moneyType: MoneyType;
    moneyValue: number;
    enabled: boolean;
}