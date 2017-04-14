import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { LoginPage } from '../login/login';

import { Usuario } from '../login/login';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
  providers : [AlertController]
})
export class PrincipalPage {

  usuario : Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) 
  {
    this.usuario = navParams.get('Usuario');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  MostrarJugar() : void {

  }

  MostrarDatos() : void {

  }

  MostrarResultados() : void {

  }

  MostrarAbout() : void {
    this.navCtrl.push(AboutPage);
  }

  Logout() : void {
    let alert = this.alertCtrl.create({
      title: 'Cerrar Sesion...',
      message: '¿Desea Cerrar la Sesion?',
      buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('No se Cerro la Sesion.');
        }
      },
      {
        text: 'Ok',
        handler: () => {
          console.log('Cerrando Sesion.');
          this.navCtrl.setRoot(LoginPage, {}, {
          animate: true, 
          direction: "backward"
          });
        }
      }
    ]
    });
    alert.present();
  }

}
