import { ChestGroup } from "../../domain/models/ChestGroup";
import { ApiChestGroupRepository } from "../../infrastructure/repositories/ApiChestGroupRepository";

export class GetChestGroupsUseCase {
    constructor() { }

    static async invoke(): Promise<ChestGroup[]> {
        const chestGroups = new ApiChestGroupRepository();
        return chestGroups.getChestGroups();
    }
}