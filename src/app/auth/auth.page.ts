import { Component, OnInit } from '@angular/core';
import {AuthResponseData, AuthService} from './auth.service';
import {NgForm} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FirebaseService} from '../firebase.service';
import {Person} from '../person';
import {Cart} from '../Cart';
import {Item} from '../Item';
import {CreateUser} from '../interface/CreateUser';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  splash = true;
  tabBarElement: any;
  isLoading = false;
  isLogin = false;
    cart: Cart = {
        cartItems: [],
        cartName: '',
    };

  newUser: Person = {
      name: '',
      address: '',
      cart: this.cart,
  };
  createObj: any;
  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private router: Router,
              private alert: AlertController, private firebase: FirebaseService) {
      // this.tabBarElement = document.querySelector('.tabbar');
  }

  ngOnInit() {
      // this.ionViewDidLoad();
       this.createObj = new CreateUser(this.firebase);
  }

  ionViewDidLoad() {
      setTimeout(() => {
          this.splash = false;
      }, 4000);
  }

  showAlert(message: string) {
    this.alert.create({header: 'Authentication Failed', message, buttons: ['OK']}).then(alertEl => alertEl.present());
  }

  onSwitchAuth() {
    this.isLogin = !this.isLogin; // inverse the code state
  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
        .create({ keyboardClose: true, message: 'Logging in...'})
        .then(loadingEl => {
          // tslint:disable-next-line:prefer-const
          let authOb: Observable<AuthResponseData>; // login or signup obj
          if (this.isLogin) {
            authOb = this.authService.login(email, password);
          } else {
            authOb = this.authService.signUp(email, password);
            this.newUser.name = email;

            // Implementation of Abstract Factory Pattern
            this.createObj.saveUser(this.newUser);
          }
          authOb.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigateByUrl('/home');
          },
              error => {
                  const code = error.error.error.message;
                  let message = 'Could not sign up, please try again';
                  if (code === 'EMAIL_EXISTS') {
                    message = 'The email already exists';
                    this.showAlert(message);
                  } else if (code === 'EMAIL_NOT_FOUND') {
                    message = 'Email not found';
                    this.showAlert(message);
                  } else if (code === 'INVALID_PASSWORD') {
                        message = 'Password is invalid';
                        this.showAlert(message);
                  }

              });
    });
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const pass = form.value.password;

    this.authenticate(email, pass);

  }

}
