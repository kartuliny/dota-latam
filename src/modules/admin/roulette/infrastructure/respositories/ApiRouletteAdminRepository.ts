import { RouletteaAdminSettingResponse } from "../responses/RouletteAdminSettingResponse";
import { BaseRepository } from "../../../../shared/insfrastructure/BaseRepository";
import { RouletteAdminItem } from "../../domain/models/RouletteAdminItem";
import { RouletteAdminRepository } from "../../domain/repositories/RouletteAdminRepository";

export class ApiRouletteAdminRepository extends BaseRepository implements RouletteAdminRepository {
    async getSetting(): Promise<RouletteaAdminSettingResponse> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/admin/roulette/settings');
        return await this.makeRequest<RouletteaAdminSettingResponse>(url, { method: 'GET', headers });
    }

    async updateSetting(setting: { [key: string]: any }): Promise<void> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/admin/roulette/settings');
        await this.makeRequest<void>(url, { method: 'POST', headers, body: JSON.stringify(setting) });
    }

    async createItem(item: RouletteAdminItem): Promise<void> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/admin/roulette/register');
        await this.makeRequest<void>(url, { method: 'POST', headers, body: JSON.stringify(item) });
    }

    async getItems(): Promise<RouletteAdminItem[]> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/admin/roulette/list');
        return await this.makeRequest<RouletteAdminItem[]>(url, { method: 'GET', headers });
    }
}