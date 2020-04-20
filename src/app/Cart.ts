import {Item} from './Item';

export class Cart {
    // tslint:disable-next-line:max-line-length
    constructor(public cartName: string, public cartItems: Item[], public id?: string) {
    }
}
