import { RouletteItem } from "../../domain/models/RouletteItem";

export interface RouletteItemsResponse {
    type0Items: RouletteItem[],
    type1Items: RouletteItem[],
    type2Items: RouletteItem[],
}