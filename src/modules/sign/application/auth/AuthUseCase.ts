import { AuthLogin } from "../../domain/models/auth/AuthLogin";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { AuthLoginResponse } from "../../infrastructure/auth/AuthLoginResponse";
import { AuthLoginParams } from "./AuthLoginParams";

export class AuthUseCase {
    constructor(private readonly repository: AuthRepository) { }
    
    async login(params: AuthLoginParams): Promise<AuthLoginResponse> {
        const authLogin = AuthLogin.create(params);
        return await this.repository.login(authLogin);
    }
}