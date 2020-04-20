import {Admin} from '../Admin';
import {Person} from '../person';
import {Cart} from '../Cart';
import {FirebaseService} from '../firebase.service';

export class CreateUser implements UserInterface {
    constructor(private firebase: FirebaseService) {
    }

    cart: Cart = {
        cartItems: [],
        cartName: '',
    };
    newUser: Person = {
        name: '',
        cart: this.cart,
        address: '',
    };

    saveUser(newUser): any {
        this.firebase.addUser(newUser).then(console.log);
        return newUser;
    }

}
