import { AuthLoginResponse } from "../../infrastructure/auth/AuthLoginResponse";
import { AuthLogin } from "../models/auth/AuthLogin";

export interface AuthRepository {
    login: (user: AuthLogin) => Promise<AuthLoginResponse>;
    loginWithDiscord: (user: AuthLogin) => Promise<AuthLoginResponse>;
}