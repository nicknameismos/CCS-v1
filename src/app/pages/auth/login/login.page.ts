import { Component, OnInit } from '@angular/core';

import { ModalController, NavController, MenuController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private menu: MenuController,
  ) { }

  Pin: String = '';
  ShowPin: Boolean = false;

  eventCapture(e) {
    this.ShowPin = false;
    this.Pin = e;
  }

  showPin() {
    this.ShowPin = !this.ShowPin;
  }

  ngOnInit() {
  }

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  login(pin) {
    this.authService.login(pin).subscribe(
      data => {
        this.alertService.presentToast("Logged In");
        console.log('Your Pin ' + this.Pin);
      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissLogin();
        this.menu.enable(true);
        this.navCtrl.navigateRoot('/app');
      }
    );
  }

}
