import { Chest } from "./Chest";

export enum ChestGroupTypes {
    EVENT = 'event',
    NORMAL = 'normal',
    PREMIUM = 'premium'
}

export interface ChestGroup {
    _id: string;
    name: string;
    enabled: boolean;
    type: ChestGroupTypes;
    chests: Chest[];
}