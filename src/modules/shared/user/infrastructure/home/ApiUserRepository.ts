import { BaseRepository } from "@/modules/shared/insfrastructure/BaseRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserResponse } from "./UserResponse";
import { UserProfileResponse } from "./UserProfileResponse";
import { UpdateProfileParams } from "../../application/user/UpdateUserProfileUseCase";
import { SendRechargeParams } from "../../application/user/SendRechargeUseCase";
import { TablePagination } from "@/modules/shared/domain/table/RechargePagination";
import { GetRechargeResponse } from "./GetRechargeResponse";

export class ApiUserRepository extends BaseRepository implements UserRepository {
    async getUserInfo(): Promise<UserResponse> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/user');
        return await this.makeRequest<UserResponse>(url, { method: 'GET', headers });
    }

    async getProfile(): Promise<UserProfileResponse> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/profile');
        return await this.makeRequest<UserProfileResponse>(url, { method: 'GET', headers });
    }

    async updateProfile(params: UpdateProfileParams): Promise<void> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/profile');
        await this.makeRequest<void>(url, { method: 'POST', headers, body: JSON.stringify(params) });
    }

    async sendRecharge(params: SendRechargeParams): Promise<void> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/profile/recharge/send');
        await this.makeRequest<void>(url, { method: 'POST', headers, body: JSON.stringify(params) });
    }

    async getRecharges(pagination: TablePagination): Promise<GetRechargeResponse> {
        const headers = await this.getHeaders();

        const paginationPath = this.getPaginationPath(pagination);

        const url = this.getEndpoint('/api/profile/recharge' + paginationPath);
        return await this.makeRequest<GetRechargeResponse>(url, { method: 'GET', headers });
    }

    async updateTradeUrl(tradeUrl: string): Promise<void> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/api/profile/tradeUrl');
        await this.makeRequest<void>(url, { method: 'POST', headers, body: JSON.stringify({ tradeUrl }) });
    }

    async logout(): Promise<void> {
        const headers = await this.getHeaders();

        const url = this.getEndpoint('/logout_latam');
        await this.makeRequest<void>(url, { method: 'GET', headers });
    }
}