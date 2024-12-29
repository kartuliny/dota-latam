import { BaseRepository } from "@/modules/shared/insfrastructure/BaseRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserResponse } from "./UserResponse";

export class ApiUserRepository extends BaseRepository implements UserRepository {
    async getUserInfo(): Promise<UserResponse> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/user');
        return await this.makeRequest<UserResponse>(url, { method: 'GET', headers });
    }

    async updateTradeUrl(tradeUrl: string): Promise<void> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/profile/tradeUrl/'+ tradeUrl);
        await this.makeRequest<void>(url, { method: 'GET', headers,  });
    }

    async logout(): Promise<void> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/logout_latam');
        await this.makeRequest<void>(url, { method: 'GET', headers });
    }
}