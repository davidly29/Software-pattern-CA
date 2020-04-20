import {Item} from '../Item';

export class ItemBuilder {
    private readonly item: Item;


    constructor() {
        this.item = {
            name: '',
            manufacture: '',
            price: 0,
            quantity: 0,
        };
    }

    name(name: string): ItemBuilder {
        this.item.name = name;
        return this;
    }
    manufacture(manufacture: string): ItemBuilder {
        this.item.manufacture = manufacture;
        return this;
    }
    price(price: number): ItemBuilder {
        this.item.price = price;
        return this;
    }
    quantity(quantity: number): ItemBuilder {
        this.item.quantity = quantity;
        return this;
    }

    buildItem(): Item {
        return this.item;
    }
}
