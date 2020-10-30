import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Storage } from '@ionic/storage';
import { Pin } from '../models/pin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: any;
  // AUTH_SERVER_ADDRESS: string = 'http://192.168.1.100:3000'; // Your Node Address
  AUTH_SERVER_ADDRESS: string = 'http://localhost:3000'; // Your Node Address


  constructor(
    private http: HttpClient,
    private storage: Storage,
    private env: EnvService,
  ) { }

  login(user: User) {
    //console.log(user);
    return this.http.post(`${this.AUTH_SERVER_ADDRESS}/auth/login`,
      user
    ).pipe(
      tap(token => {
        //this.storage.setItem('token', token)
        this.storage.set('token', token)
          .then(
            () => {
              console.log('Token Stored');
            },
            error => console.error('Error storing item', error)
          );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  loginpin(pin: Pin) {
    //console.log(pin);
    return this.http.post(`${this.AUTH_SERVER_ADDRESS}/auth/loginpin`,
      pin
    ).pipe(
      tap(token => {
        //this.storage.setItem('token', token)
        this.storage.set('token', token)
          .then(
            () => {
              console.log('Token Stored');
            },
            error => console.error('Error storing item', error)
          );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  register(fName: String, lName: String, email: String, password: String) {
    return this.http.post(`${this.AUTH_SERVER_ADDRESS}/auth/register`,
      { first_name: fName, last_name: lName, email: email, password: password }
    )
  }
  registerPin(pin: string) {
    return this.http.post(`${this.AUTH_SERVER_ADDRESS}/auth/registerpin`,
      { pin: pin }
    )
  }

  logout() {
    console.log('Logout')
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http.get(`${this.AUTH_SERVER_ADDRESS}/auth/logout`, { headers: headers })
      .pipe(
        tap(data => {
          this.storage.remove("token");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      )
  }

  user() {
    console.log('GET User Data');
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http.get<User>(`${this.AUTH_SERVER_ADDRESS}/user`, { headers: headers })
      .pipe(
        tap(user => {
          return user;
        })
      )
  }

  pin() {
    console.log('GET Pin Data');
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http.get<Pin>(`${this.AUTH_SERVER_ADDRESS}/pin`, { headers: headers })
      .pipe(
        tap(pin => {
          return pin;
        })
      )
  }

  getToken() {
    //return this.storage.getItem('token').then(
    return this.storage.get('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}
