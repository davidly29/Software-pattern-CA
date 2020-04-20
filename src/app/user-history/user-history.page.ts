import { Component, OnInit } from '@angular/core';
import {Person} from '../person';
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.page.html',
  styleUrls: ['./user-history.page.scss'],
})
export class UserHistoryPage implements OnInit {
  personHistory: Person[] = [];
  name: string;
  allHistorys: Person[] = [];
  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.firebase.gethistory().subscribe(prod => {
      this.allHistorys = prod;
    });
  }
  getHistoryByName(name) {
    this.personHistory.push(this.allHistorys.find(x => x.name === name));
    return this.personHistory;
  }
}
