import {Cart} from './Cart';

export class Person {
    // tslint:disable-next-line:max-line-length
    constructor(public name: string, public address?: string, public cart?: Cart, public payment?: string, public id?: string) {
    }
}
