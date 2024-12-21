import { Prize } from "../Index.vue";
import { RouletteItem } from "@/modules/admin/roulette/domain/models/RouletteAdminItem";

export interface RouletteProProps {
    type: RouletteOrientation;
    prizes: RouletteItem[],
    designOption: { [key: string]: any },
    start: boolean,
    prizeIndex: number,
    spinningTime: number,
    classes?: string,
    transitionFunction?: string,
    options: { stopInCenter: boolean, withoutAnimation: boolean }
    defaultDesignOptions: { prizesWithText: boolean, hideCenterDelimiter: boolean }
}

export enum RouletteOrientation {
    horizontal = 'horizontal',
    vertical = 'vertical'
}


export interface RouletteProEmits {
    onPrizeDefined: () => void;
}




export interface PrizeItemProps {
    image: string;
    text?: string;
}
  
export interface IRegularDesignProps {
    hideCenterDelimiter?: boolean;
    prizesWithText?: boolean;
  }