import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from './user.model';
import {map, tap} from 'rxjs/operators';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 public user = new BehaviorSubject<User>(null );

  get userIsAuthenticated() { // dynamic for accessing user auth
    return this.user.asObservable().pipe(map(userobj => {
    if (userobj) {
     return !!userobj.userToken;
    } else {
      return  false;
    }

      })); // possible change to other token var
  }

  get UserDetails() {
      return this.user.asObservable().pipe(map(user => {
          return user;
      }));
  }

  get userId() { // dynamic for accessing user at any time
    return this.user.asObservable().pipe(map(userobj => {
      if (userobj) {
        return userobj.id;
      } else {
        return null;
      }
    }));
  }
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOp0iT3lh_aI7wG4bdcpIU2KDSRLnoxi8`,
        {
            email: email, password: password, returnSecureToken: true}).pipe(tap(this.setUserData.bind(this)));
  }

  signUp(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAOp0iT3lh_aI7wG4bdcpIU2KDSRLnoxi8`,
        {email, password, returnSecureToken: true}).pipe(tap(this.setUserData.bind(this)
    ));
  }

  logout() {
    this.user.next(null);
  }

  private setUserData(userData: AuthResponseData) {
      const expireTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000)); // Sets new timestamp for token
      this.user.next(new User(userData.localId, userData.email, userData.idToken, expireTime));
  }

}
