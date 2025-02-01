import { ApiUserRepository } from '../../infrastructure/home/ApiUserRepository';

export class SendRechargeUseCase {
    constructor() { }

    static async invoke(params: SendRechargeParams): Promise<void> {
        const repository = new ApiUserRepository();
        return (await repository.sendRecharge(params));
    }
}

export interface SendRechargeParams {
    operationNumber: number;
    fullName: string;
    amount: number;
    paymentMethod: string;
}