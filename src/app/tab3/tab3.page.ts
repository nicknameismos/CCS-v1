import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

import { User } from 'src/app/models/user';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: User;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

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
