import { RechargePaymentMethod, RechargeStatus } from "../Recharge";

export interface RechargeTableItem {
    [key: string]: any;
    _id: string | null;
    paymentMethod: RechargePaymentMethod;
    operationNumber: Number | null;
    fullName: String | null;
    amount: number | null;
    status: RechargeStatus;
    createdAt: string | null;
}