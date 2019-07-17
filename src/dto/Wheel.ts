import { DrinkType } from './DrinkType';

export class Wheel {
    drinkTypes: DrinkType[];

    constructor(drinkTypes: DrinkType[]) {
        this.drinkTypes = drinkTypes;
    }
}