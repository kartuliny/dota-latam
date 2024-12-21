import { RouletteItem } from "../../domain/models/RouletteItem";
import { RunRouletteData } from "../../domain/models/RunRouletteData";

export interface RunRouletteResponse extends RunRouletteData {
    items: RouletteItem[];
    itemIndexSelected: number;
}