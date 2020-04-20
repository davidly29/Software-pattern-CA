import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import {Person} from './person';
import {Item} from './Item';
import {Review} from './review';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
    private reviewCollection: AngularFirestoreCollection<Review>;
    private review: Observable<Review[]>;

  private userCollection: AngularFirestoreCollection<Person>;
  private person: Observable<Person[]>;

  private historys: AngularFirestoreCollection<Person>;
  private personHistory: Observable<Person[]>;

  private itemCollection: AngularFirestoreCollection<Item>;
  private item: Observable<Item[]>;

  tempLobbyObj: AngularFirestoreDocument<any>;

  constructor(db: AngularFirestore) {
    this.userCollection = db.collection<Person>('users');
    this.itemCollection = db.collection<Item>('items');
    this.historys = db.collection<Person>('userHistory');
    this.reviewCollection = db.collection<Review>('review');

    this.review = this.reviewCollection.snapshotChanges().pipe(
          map(actions => {
              return actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return { id, ...data};
              });
          })
      );

    this.personHistory = this.historys.snapshotChanges().pipe(
          map(actions => {
              return actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return { id, ...data};
              });
          })
      );

    this.person = this.userCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data};
          });
        })
    );

    this.item = this.itemCollection.snapshotChanges().pipe(
          map(actions => {
              return actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return { id, ...data};
              });
          })
      );

  }

  getReviews() {
      return this.review;
  }
  gethistory() {
      return this.personHistory;
  }

  getItems() {
      return this.item;
  }

  getUsers() {
    return this.person;
  }

  getUser(id: string): Observable<Person> {
    return this.userCollection.doc<Person>(id).valueChanges().pipe(
        take(1),
        map(lb => {
          lb.id = id;
          return lb;
        })
    );
  }

  addUser(user: Person) {
    return this.userCollection.add(user);
  }
    updateUser(person: Person, personId: string) {
        return this.userCollection.doc(personId).update(person);
    }
    removePerson(personId) {
        return this.userCollection.doc(personId).delete();
    }

    removeItem(id) {
      return this.itemCollection.doc(id).delete();
    }

    getItem(id: string): Observable<Item> {
        return this.itemCollection.doc<Item>(id).valueChanges().pipe(
            take(1),
            map(lb => {
                lb.id = id;
                return lb;
            })
        );
    }
    addItem(item: Item) {
        return this.itemCollection.add(item);
    }
    updateItem(item: Item, itemId: string) {
        return this.itemCollection.doc(itemId).update(item);
    }
  // updateLobby(lobby: LobbyModel, lobbyId: string) {
  //   return this.lobbyCollection.doc(lobbyId).update(lobby);
  // }
    addUserHistory(user: Person) {
        return this.historys.add(user);
    }
    addtheReview(rev: Review) {
        return this.reviewCollection.add(rev);
    }
}
