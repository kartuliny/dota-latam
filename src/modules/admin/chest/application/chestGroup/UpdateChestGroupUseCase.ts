import { ApiChestGroupRepository } from "../../infrastructure/repositories/ApiChestGroupRepository";

export class UpdateChestGroupUseCase {
    constructor() { }

    static async invoke(params: UpdateChestGroupParams): Promise<void> {
        const repository = new ApiChestGroupRepository();
        return await repository.updateChestGroup(params);
    }
}

export interface UpdateChestGroupParams {
    name: string;
    type: string;
    enabled: boolean;
}