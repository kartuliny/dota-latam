import { UserResponse } from "../../infrastructure/home/UserResponse";

export interface UserRepository {
    getUserInfo: () => Promise<UserResponse>;
    logout: () => Promise<void>;
}