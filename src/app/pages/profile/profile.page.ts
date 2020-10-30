import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { NavController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  subscribe: any;

  constructor(
    // Auth
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private platform: Platform
  ) {

  }

  ngOnInit() {
  }

  logoutExitapp() {
    // this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
    //   if (this.constructor.name === "ProfilePage") {
    //     if (window.confirm("do you want to exit app")) {
    //       navigator['app'].exitApp();
    //       console.log('logout OK!');
    //     }
    //   }
    // });
    if (window.confirm("do you want to exit app")) {
      navigator['app'].exitApp();
      console.log('close app');
    }
  }
  // ionViewWillEnter() {
  //   this.authService.user().subscribe(
  //     user => {
  //       this.user = user;
  //     }
  //   );
  // }

  // When Logout Button is pressed
  logout() {
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/landing');
      }
    );
  }

}
