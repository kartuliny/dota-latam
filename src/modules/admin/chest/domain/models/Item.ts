export type ItemTypes = "tradable" | "notradable";

export interface Item {
    id?: string;
    name: string;
    rarity: number;
    type: ItemTypes;
    image: string;
    quantity: number;
}

export type ClassifiedItems = Record<string, Item>;
