import { ApiUserRepository } from '../../infrastructure/home/ApiUserRepository';

export class LogoutUseCase {
    constructor() { }

    static async invoke(): Promise<void> {
        const repository = new ApiUserRepository();
        return (await repository.logout());
    }
}