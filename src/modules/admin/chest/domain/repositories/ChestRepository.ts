import { StoreChestParams } from "../../application/chest/StoreChestUseCase";
import { UpdateChestParams } from "../../application/chest/UpdateChestUseCase";
import { Chest } from "../models/Chest";

export interface ChestRepository {
    getChests: () => Promise<Chest[]>;
    storeChest: (params: StoreChestParams) => Promise<void>;
    updateChest: (params: UpdateChestParams) => Promise<void>;
}