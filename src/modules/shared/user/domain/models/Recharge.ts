import { RechargeTableItem } from "./table/RechargeTableItem";

export enum RechargeStatus {
    PENDING = 0,
    APPROVED = 1,
    REJECTED = 2,
}

export enum RechargePaymentMethod {
    YAPE = 'Yape',
    PLIN = 'Plin'
}

export interface Recharge extends RechargeTableItem{
}