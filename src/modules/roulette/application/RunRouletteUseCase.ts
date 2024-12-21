import { RunRouletteData } from "../domain/models/RunRouletteData";
import { ApiRouletteRepository } from "../infrastructure/ApiRouletteRepository";

export class RunRouletteUseCase {
    constructor() { }
    
    static async invoke(params: RunRuletteParams): Promise<RunRouletteData> {
        const repository = new ApiRouletteRepository();
        return await repository.run(params);
    }
}

export interface RunRuletteParams {
    tierName: string;
    grantItemId?: string;
}