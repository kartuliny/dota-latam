import { Prize } from "../Index.vue";

export interface RouletteProProps {
    type: RouletteOrientation;
    prizes: Prize[],
    designOption: { [key: string]: any },
    start: boolean,
    prizeIndex: number,
    spinningTime: number,
    classes?: string,
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