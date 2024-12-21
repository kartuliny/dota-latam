import { BaseRepository } from "@/modules/shared/insfrastructure/BaseRepository";
import { RunRouletteResponse } from "./responses/RunRouletteResponse";
import { RouletteRepository } from "../domain/repositories/RouletteRepository";
import { RunRuletteParams } from "../application/RunRouletteUseCase";
import { RouletteSettingResponse } from "./responses/RouletteSettingResponse";
import { RouletteItemsResponse } from "./responses/RouletteItemsResponse";

export class ApiRouletteRepository extends BaseRepository implements RouletteRepository {
    async run(params: RunRuletteParams): Promise<RunRouletteResponse> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/roulette/run');
        return await this.makeRequest<RunRouletteResponse>(url, { method: 'POST', headers , body: JSON.stringify(params) });
    }

    async getSetting(): Promise<RouletteSettingResponse> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/roulette/settings');
        return await this.makeRequest<RouletteSettingResponse>(url, { method: 'GET', headers });
    }

    async getItems(): Promise<RouletteItemsResponse> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/roulette/list');
        return await this.makeRequest<RouletteItemsResponse>(url, { method: 'GET', headers });
    }
}