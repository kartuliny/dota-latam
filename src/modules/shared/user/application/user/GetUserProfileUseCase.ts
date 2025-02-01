import { UserProfile } from "../../domain/models/UserProfile";
import { ApiUserRepository } from '../../infrastructure/home/ApiUserRepository';

export class GetUserProfileUseCase {
    constructor() { }

    static async invoke(): Promise<UserProfile> {
        const repository = new ApiUserRepository();
        return (await repository.getProfile());
    }
}