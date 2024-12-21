import { UserData } from "../../domain/models/UserData";
import { ApiUserRepository } from '../../infrastructure/home/ApiUserRepository';

export class GetUserDataUseCase {
    constructor() { }

    static async invoke(): Promise<UserData> {
        const repository = new ApiUserRepository();
        return (await repository.getUserInfo())?.userData;
    }
}