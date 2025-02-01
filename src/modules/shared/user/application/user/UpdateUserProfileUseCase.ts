import { ApiUserRepository } from '../../infrastructure/home/ApiUserRepository';

export class UpdateUserProfileUseCase {
    constructor() { }

    static async invoke(params: UpdateProfileParams): Promise<void> {
        const repository = new ApiUserRepository();
        return (await repository.updateProfile(params));
    }
}

export interface UpdateProfileParams {
    tradeUrl: string;
    steamId: string;
}