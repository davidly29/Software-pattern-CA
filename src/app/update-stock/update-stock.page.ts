import { Component, OnInit } from '@angular/core';
import {Item} from '../Item';
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.page.html',
  styleUrls: ['./update-stock.page.scss'],
})
export class UpdateStockPage implements OnInit {
  newStock: Item = {
    price: 0,
    name: '',
    quantity: 0,
    manufacture: '',
    id: '',
  };
  search: string;
  allProducts: Item[] = [];
  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.firebase.getItems().subscribe(prod => {
      this.allProducts = prod;
    });
  }

  find() {
    this.newStock = this.allProducts.find(x => x.name === this.search);
    return this.newStock;
  }
  updateStock() {
    this.firebase.updateItem(this.newStock, this.newStock.id);
  }
}
