import { Component, OnInit } from '@angular/core';
import {Item} from '../Item';
import {FirebaseService} from '../firebase.service';
import {ToastController} from '@ionic/angular';
import {ItemBuilder} from '../builder/ItemBuilder';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.page.html',
  styleUrls: ['./add-stock.page.scss'],
})
export class AddStockPage implements OnInit {
  newStock: Item = {
    price: 0,
    name: '',
    quantity: 0,
    manufacture: '',
  };
  constructor(private firebase: FirebaseService, private toastCtrl: ToastController) { }

  ngOnInit() {
  }
  addStock() {

    // Builder Pattern Implementation
    const buildStockItem: Item = new ItemBuilder()
        .name(this.newStock.name)
        .manufacture(this.newStock.manufacture)
        .price(this.newStock.price)
        .quantity(this.newStock.quantity)
        .buildItem();

    this.firebase.addItem(buildStockItem).then(console.log);
    this.toastCtrl.create({
      message: 'Item Created',
      duration: 3000
    }).then(toast => toast.present());
  }
}
