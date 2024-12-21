import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { AuthLogin } from "../../domain/models/auth/AuthLogin";
import { AuthLoginResponse } from "./AuthLoginResponse";
import { BaseRepository } from "@/modules/shared/insfrastructure/BaseRepository";

export class ApiAuthRepository extends BaseRepository implements AuthRepository {
    async login(user: AuthLogin): Promise<AuthLoginResponse> {
        const headers = await this.getHeaders();

        const body = JSON.stringify({
            email: user.email,
            password: user.password,
        });

        const url = this.getEndpoint('/api/auth/login');
        return await this.makeRequest<AuthLoginResponse>(url, { method: 'POST', headers, body });
    }

    async loginWithDiscord(user: AuthLogin): Promise<AuthLoginResponse> {
        const headers = await this.getHeaders();

        const body = JSON.stringify({
            email: user.email,
            password: user.password,
        });

        const url = this.getEndpoint('/api/auth/login-discord');
        return await this.makeRequest<AuthLoginResponse>(url, { method: 'POST', headers, body });
    }
}