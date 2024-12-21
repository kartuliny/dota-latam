import { UserXPData } from "../domain/models/UserXPData";
import { ApiXPAdminRepository } from "../infrastructure/repositories/ApiXPAdminRepository";

export class GetXPAdminHistoryUseCase {
    constructor() { }

    static async invoke(): Promise<UserXPData[]> {
        const repository = new ApiXPAdminRepository();
        return await repository.getHistory();
    }
}