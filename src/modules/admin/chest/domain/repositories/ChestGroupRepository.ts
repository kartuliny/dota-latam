import { StoreChestGroupParams } from "../../application/chestGroup/StoreChestGroupUseCase";
import { UpdateChestGroupParams } from "../../application/chestGroup/UpdateChestGroupUseCase";
import { ChestGroup } from "../models/ChestGroup";

export interface ChestGroupRepository {
    getChestGroups: () => Promise<ChestGroup[]>;
    storeChestGroup: (params: StoreChestGroupParams) => Promise<void>;
    updateChestGroup: (params: UpdateChestGroupParams) => Promise<void>;
}