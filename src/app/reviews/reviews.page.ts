import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {Item} from '../Item';
import {Review} from '../review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  itemName: string;
  commentReview: string;
  allProducts: Item[] = [];
  productReview: Review = {
    itemId: '3aWQQc0vCoEQ3VK2CDzG',
    rating: 2,
    comment: 'test',
    name: 'Dairy Milk'

  };
  product: Item = {
    name: '',
    id: '',
    quantity: 0,
    price: 0,
    manufacture: '',
  };
  allReviews: Review[] = [];
  currentItemReview: Review[] = [];
  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.firebase.getItems().subscribe(prod => {
      this.allProducts = prod;
    });
    this.firebase.getReviews().subscribe(prod => {
      this.allReviews = prod;
    });
  }
  addItem() {
    this.productReview.itemId = this.product.id;
    this.productReview.name = this.product.name;
    this.productReview.comment = this.commentReview;
    this.firebase.addtheReview(this.productReview);
  }

  findProductReview(name) {
    this.product = this.allProducts.find(x => x.name === name);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.allReviews.length; i ++) {
      if (this.allReviews[i].name === name) {
        this.currentItemReview.push(this.allReviews[i]);
      }
    }
    return this.currentItemReview;
  }
}
