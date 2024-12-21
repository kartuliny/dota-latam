export interface RouletteAdminItem {
    _id: string;
    name: string;
    price: number;
    rarity: number;
    url: string;
    type: number;
    quantity: number;
    enabled: boolean;
    probability?: number;
};