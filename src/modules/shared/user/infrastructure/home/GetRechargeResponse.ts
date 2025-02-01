import { Recharge } from "../../domain/models/Recharge";

export interface GetRechargeResponse {
    totalElements: number;
    data: Recharge[];
}