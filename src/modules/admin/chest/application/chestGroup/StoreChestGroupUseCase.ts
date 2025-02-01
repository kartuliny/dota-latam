import { ApiChestGroupRepository } from "../../infrastructure/repositories/ApiChestGroupRepository";

export class StoreChestGroupUseCase {
    constructor() { }

    static async invoke(params: StoreChestGroupParams): Promise<void> {
        const repository = new ApiChestGroupRepository();
        return await repository.storeChestGroup(params);
    }
}

export interface StoreChestGroupParams {
    name: string;
    type: string;
    enabled: boolean;
}