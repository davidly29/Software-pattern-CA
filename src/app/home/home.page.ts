import {Component, OnInit} from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import {FirebaseService} from '../firebase.service';
import {Person} from '../person';
import {Item} from '../Item';
import {AuthService} from '../auth/auth.service';
import {Cart} from '../Cart';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Review} from '../review';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
person: Person = {
  id: '',
  address: '',
  name: 'test',
  cart: null,
};
userCart: Cart = {
  cartItems: [],
  cartName: '',
};
item: Item = {
  name: 'Dairy Milk',
  manufacture: 'Cadburys',
  price: 2.00,
  quantity: 20,
};
userReview: Review = {
  itemId: '',
  comment: '',
  name: '',
  rating: 0,
};
itemToAdd: Item = {
  name: '',
  price: 0,
  manufacture: '',
  quantity: 0,
  id: '',
};

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6,
  };
  allProducts: Item[] = [];
  allHistorys: Person[] = [];

  currentItemReview: Review[] = [];
  allUsers: Person[] = [];
  isAdmin = false;
  name: string;
  constructor(private firebase: FirebaseService, private authService: AuthService, private toastCtrl: ToastController
  ,           private route: Router) {

  }

  ngOnInit() {
    this.firebase.getItems().subscribe(prod => {
      this.allProducts = prod;
    });
    this.firebase.getUsers().subscribe(prod => {
      this.allUsers = prod;
    });
    this.firebase.gethistory().subscribe(prod => {
        this.allHistorys = prod;
    });

    if (this.authService.user.getValue().email === 'admin@gmail.com') {
      this.isAdmin = true;
    }
  }

  viewBasket() {
    this.route.navigate(['/basket']);
  }
  savePerson() {
    this.firebase.addUser(this.person).then(console.log);
  }
  populateProducts() {
      this.route.navigate(['/add-stock']);
  }
  goHistory() {
    this.route.navigate(['/user-history']);
  }
  updateStock() {
    this.route.navigate(['/update-stock']);
  }
  viewReviews(itemId) {
    this.route.navigate(['/reviews']);
    // this.userReview.itemId = itemId;
  }
  removeItem(itemId) {
    this.firebase.removeItem(itemId).then(console.log);
    this.toastCtrl.create({
      message: 'Item Remove',
      duration: 3000
    }).then(toast => toast.present());
  }
  addToCart(itemId) {
    this.itemToAdd = this.allProducts.find(x => x.id === itemId);

    this.person = this.allUsers.find(x => x.name === this.authService.user.getValue().email);
    this.userCart = this.person.cart;

    this.userCart.cartItems.push(this.itemToAdd);
    this.person.cart = this.userCart;
    this.firebase.updateUser(this.person, this.person.id).then(console.log);

    this.itemToAdd.quantity = this.itemToAdd.quantity - 1;
    this.firebase.updateItem(this.itemToAdd, itemId).then(console.log);
    this.toastCtrl.create({
      message: 'Item Added',
      duration: 3000
    }).then(toast => toast.present());
  }


}
