import { HomeData } from "../../domain/models/HomeData";
import { ApiAuthRepository } from '../../infrastructure/home/ApiHomeRepository';

export class GetHomeDataUseCase {
    constructor() { }

    async invoke(): Promise<HomeData> {
        const repository = new ApiAuthRepository();
        return await repository.getHomeInfo();
    }
}