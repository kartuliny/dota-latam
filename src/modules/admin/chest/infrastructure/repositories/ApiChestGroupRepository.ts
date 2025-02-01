import { BaseRepository } from "@/modules/shared/insfrastructure/BaseRepository";
import { ChestGroupRepository } from "../../domain/repositories/ChestGroupRepository";
import { ChestGroup } from "../../domain/models/ChestGroup";
import { StoreChestGroupParams } from "../../application/chestGroup/StoreChestGroupUseCase";
import { UpdateChestGroupParams } from "../../application/chestGroup/UpdateChestGroupUseCase";

export class ApiChestGroupRepository extends BaseRepository implements ChestGroupRepository {
    async getChestGroups(): Promise<ChestGroup[]> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/admin/chest/groups');
        return await this.makeRequest<ChestGroup[]>(url, { method: 'GET', headers });
    }

    async getChestGroup(): Promise<ChestGroup[]> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/');
        return await this.makeRequest<ChestGroup[]>(url, { method: 'GET', headers });
    }

    async updateChestGroup(params: UpdateChestGroupParams): Promise<void> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/admin/chest/group/update');
        return await this.makeRequest<void>(url, { method: 'POST', headers, body: JSON.stringify(params) });
    }

    async storeChestGroup(params: StoreChestGroupParams): Promise<void> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/admin/chest/group');
        return await this.makeRequest<void>(url, { method: 'POST', headers, body: JSON.stringify(params) });
    }
}