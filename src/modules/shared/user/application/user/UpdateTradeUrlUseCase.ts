import { ApiUserRepository } from '../../infrastructure/home/ApiUserRepository';

export class UpdateTradeUrlUseCase {
    constructor() { }

    static async invoke(tradeUrl: string): Promise<void> {
        const repository = new ApiUserRepository();
        return (await repository.updateTradeUrl(tradeUrl));
    }
}