import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {Person} from '../person';
import {Cart} from '../Cart';
import {AuthService} from '../auth/auth.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {
  userCart: Cart = {
    cartItems: [],
    cartName: '',
  };
  person: Person = {
    id: '',
    name: 'test',
    address: '',
    cart: this.userCart,
  };
  allUsers: Person[] = [];
  total = 0;
  constructor(private firebase: FirebaseService, private authService: AuthService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.firebase.getUsers().subscribe(prod => {
      this.allUsers = prod;
    });

  }
  loadCart() {
    this.person = this.allUsers.find(x => x.name === this.authService.user.getValue().email);
    this.getTotal();
    return this.person;
  }
  getTotal() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.person.cart.cartItems.length; i++) {
    this.total = this.total + this.person.cart.cartItems[i].price;
    }
    return this.total;
  }
  writeHistory() {
    this.firebase.addUserHistory(this.person).then(console.log);
    this.toastCtrl.create({
      message: 'Order Placed',
      duration: 3000
    }).then(toast => toast.present());
  }
  removeItem() {

  }
}
