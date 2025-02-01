import { BaseRepository } from "@/modules/shared/insfrastructure/BaseRepository";
import { ItemRepository } from "../../domain/repositories/ItemRepository";
import { ClassifiedItems } from "../../domain/models/Item";

export class ApiItemRepository extends BaseRepository implements ItemRepository {
    async getItems(): Promise<ClassifiedItems> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/admin/items');
        return await this.makeRequest<ClassifiedItems>(url, { method: 'GET', headers });
    }

    async refreshItems(): Promise<void> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/admin/items/refresh');
        return await this.makeRequest<void>(url, { method: 'GET', headers });
    }
}