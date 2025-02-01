export enum MoneyType {
    LATAMCOIN = 'latamcoin',
    XP = 'xp',
    ITEMS = 'items',
}

export interface ChestItem {
}

export interface Chest {
    _id?: string;
    name: string;
    showDropRate: boolean;
    backgroundImageUrl: string;
    contentImageUrl: string;
    moneyType: MoneyType;
    moneyValue: number;
    enabled: boolean;
    items?: ChestItem[];
}