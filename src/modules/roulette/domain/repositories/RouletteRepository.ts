import { RunRuletteParams } from "../../application/RunRouletteUseCase";
import { RouletteItemsResponse } from "../../infrastructure/responses/RouletteItemsResponse";
import { RouletteSettingResponse } from "../../infrastructure/responses/RouletteSettingResponse";
import { RunRouletteData } from "../models/RunRouletteData";

export interface RouletteRepository {
    run: (params: RunRuletteParams) => Promise<RunRouletteData>;
    getSetting: () => Promise<RouletteSettingResponse>;
    getItems: () => Promise<RouletteItemsResponse>;
}