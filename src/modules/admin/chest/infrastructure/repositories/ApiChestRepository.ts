import { BaseRepository } from "@/modules/shared/insfrastructure/BaseRepository";
import { StoreChestParams } from "../../application/chest/StoreChestUseCase";
import { ChestRepository } from "../../domain/repositories/ChestRepository";
import { Chest } from "../../domain/models/Chest";
import { UpdateChestParams } from "../../application/chest/UpdateChestUseCase";

export class ApiChestRepository extends BaseRepository implements ChestRepository {
    async getChests(): Promise<Chest[]> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/admin/chests');
        return await this.makeRequest<Chest[]>(url, { method: 'GET', headers });
    }

    async getChest(): Promise<Chest[]> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/');
        return await this.makeRequest<Chest[]>(url, { method: 'GET', headers });
    }

    async updateChest(params: UpdateChestParams): Promise<void> {
        const headers = await this.getHeaders('multipart/form-data');

        const formData = new FormData();
        if (params._id) formData.append('_id', params._id);
        if (params.name) formData.append('name', params.name);
        if (params.backgroundImageUrl) formData.append('backgroundImageUrl', params.backgroundImageUrl);
        if (params.backgroundImageUrlOld) formData.append('backgroundImageUrlOld', params.backgroundImageUrlOld);
        if (params.contentImageUrl) formData.append('contentImageUrl', params.contentImageUrl);
        if (params.contentImageUrlOld) formData.append('contentImageUrlOld', params.contentImageUrlOld);
        if (params.moneyType) formData.append('moneyType', params.moneyType);
        if (params.moneyValue) formData.append('moneyValue', params.moneyValue.toString());
        if (params.showDropRate) formData.append('showDropRate', params.showDropRate.toString());
        if (params.enabled) formData.append('enabled', params.enabled.toString());

        const url = this.getEndpoint('/api/admin/chest/update');
        return await this.makeRequest<void>(url, { method: 'POST', headers, body: formData });
    }

    async storeChest(params: StoreChestParams): Promise<void> {
        const headers = await this.getHeaders('multipart/form-data');

        const formData = new FormData();
        if (params.name) formData.append('name', params.name);
        if (params.backgroundImageUrl) formData.append('backgroundImageUrl', params.backgroundImageUrl);
        if (params.contentImageUrl) formData.append('contentImageUrl', params.contentImageUrl);
        if (params.moneyType) formData.append('moneyType', params.moneyType);
        if (params.moneyValue) formData.append('moneyValue', params.moneyValue.toString());
        if (params.showDropRate) formData.append('showDropRate', params.showDropRate.toString());
        if (params.enabled) formData.append('enabled', params.enabled.toString());

        const url = this.getEndpoint('/api/admin/chest');
        return await this.makeRequest<void>(url, { method: 'POST', headers, body: formData });
    }
}