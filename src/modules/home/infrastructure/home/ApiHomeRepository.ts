import { BaseRepository } from "@/modules/shared/insfrastructure/BaseRepository";
import { HomeRepository } from "../../domain/repositories/HomeRepository";
import { HomeResponse } from "./HomeResponse";

export class ApiAuthRepository extends BaseRepository implements HomeRepository {
    async getHomeInfo(): Promise<HomeResponse> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/home');
        return await this.makeRequest<HomeResponse>(url, { method: 'GET', headers });
    }
}