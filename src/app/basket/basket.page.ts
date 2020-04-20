import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {Person} from '../person';
import {Cart} from '../Cart';
import {AuthService} from '../auth/auth.service';
import {ToastController} from '@ionic/angular';
import {SaveHistory} from '../interface/SaveHistory';

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
    payment: '',
    cart: this.userCart,
  };
  allUsers: Person[] = [];
  total = 0;
  saveHistory: any;
  constructor(private firebase: FirebaseService, private authService: AuthService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.firebase.getUsers().subscribe(prod => {
      this.allUsers = prod;
    });
    this.saveHistory = new SaveHistory(this.firebase);
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
    this.saveHistory.saveUser(this.person);
    this.toastCtrl.create({
      message: 'Order Placed',
      duration: 3000
    }).then(toast => toast.present());
  }
}
