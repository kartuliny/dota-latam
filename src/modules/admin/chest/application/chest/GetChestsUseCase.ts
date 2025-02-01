import { Chest } from "../../domain/models/Chest";
import { ApiChestRepository } from "../../infrastructure/repositories/ApiChestRepository";

export class GetChestsUseCase {
    constructor() { }

    static async invoke(): Promise<Chest[]> {
        const chests = new ApiChestRepository();
        return chests.getChests();
    }
}