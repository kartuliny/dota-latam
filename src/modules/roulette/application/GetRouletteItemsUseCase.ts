import { ApiRouletteRepository } from "../infrastructure/ApiRouletteRepository";
import { RouletteItemsResponse } from "../infrastructure/responses/RouletteItemsResponse";

export class GetRouletteItemsUseCase {
    constructor() { }

    static async invoke(): Promise<RouletteItemsResponse> {
        const repository = new ApiRouletteRepository();
        return await repository.getItems();
    }
}