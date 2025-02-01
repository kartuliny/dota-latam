import { TablePagination } from "@/modules/shared/domain/table/RechargePagination";
import { ApiUserRepository } from '../../infrastructure/home/ApiUserRepository';
import { GetRechargeResponse } from "../../infrastructure/home/GetRechargeResponse";

export class GetRechargesUseCase {
    constructor() { }

    static async invoke(pagination: TablePagination): Promise<GetRechargeResponse> {
        const repository = new ApiUserRepository();
        return (await repository.getRecharges(pagination));
    }
}