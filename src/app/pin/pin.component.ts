import { NgForm } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { Pin } from '../models/pin';

@Component({
  selector: 'custom-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
})
export class PinComponent {
  @Input() pagetitle: String = 'Enter Pin';

  pin: string = '';

  @Output() change: EventEmitter<string> = new EventEmitter<string>();



  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private menu: MenuController,
    private alertService: AlertService,
    private alertController: AlertController
  ) { }


  // Pin: String = '';
  // ShowPin: Boolean = false;

  // eventCapture(e) {
  //   this.ShowPin = false;
  //   this.Pin = e;
  // }

  // showPin() {
  //   this.ShowPin = !this.ShowPin;
  // }

  dismissPin() {
    this.modalController.dismiss();
  }

  emitEvent() {
    this.change.emit(this.pin);
    // let datapin = {
    //   pin: this.pin
    // };
    if (this.pin.length === 6) {
      this.dismissPin();
      // this.presentAlert();
      this.navCtrl.navigateForward('profile');

    } else {
      this.pin.length < 6;
      alert('Please Enter 6 Pin');
    }

  }


  handleInput(pin: string) {
    if (pin === 'clear') {
      this.pin = '';
      // this.dismissPin();
      return;
    }

    if (this.pin.length === 6) {
      return;
    }
    this.pin += pin;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Your Pin Is',
      subHeader: this.pin,
      // message: this.pin,
      buttons: ['OK']
    });

    await alert.present();
  }

}
