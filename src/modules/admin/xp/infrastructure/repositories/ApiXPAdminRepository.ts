import { BaseRepository } from "../../../../shared/insfrastructure/BaseRepository";
import { UserXPData } from "../../domain/models/UserXPData";
import { XPAdminRepository } from "../../domain/repositories/XPAdminRepository";

export class ApiXPAdminRepository extends BaseRepository implements XPAdminRepository {
    async getHistory(): Promise<UserXPData[]> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/admin/xp/history');
        return await this.makeRequest<UserXPData[]>(url, { method: 'GET', headers });
    }
}