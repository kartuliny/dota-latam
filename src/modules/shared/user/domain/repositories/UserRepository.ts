import { TablePagination } from "@/modules/shared/domain/table/RechargePagination";
import { SendRechargeParams } from "../../application/user/SendRechargeUseCase";
import { UpdateProfileParams } from "../../application/user/UpdateUserProfileUseCase";
import { UserResponse } from "../../infrastructure/home/UserResponse";
import { GetRechargeResponse } from "../../infrastructure/home/GetRechargeResponse";

export interface UserRepository {
    getUserInfo: () => Promise<UserResponse>;
    logout: () => Promise<void>;
    updateTradeUrl: (tradeUrl: string) => Promise<void>;
    updateProfile: (params: UpdateProfileParams) => Promise<void>;
    sendRecharge: (params: SendRechargeParams) => Promise<void>;
    getRecharges: (pagination: TablePagination) => Promise<GetRechargeResponse>;
}