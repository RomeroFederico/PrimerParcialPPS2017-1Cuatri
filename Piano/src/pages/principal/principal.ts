import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';

import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';

import { Jugador } from '../login/login';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
  providers: [ToastController, Vibration, NativeAudio]
})
export class PrincipalPage {

  jugador : Jugador;

  inhabilitarBotones : boolean = null;

  grabar : boolean = true;
  pararGrabacion : boolean = false;
  reproducir : boolean = false;

  mostrarMensaje : boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl : AlertController, public toastCtrl : ToastController,
              public vibration : Vibration, public native : NativeAudio) 
  {
    this.jugador = navParams.get('Jugador');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  MostrarAbout() : void 
  {
    console.log("Mostrar About");
    this.navCtrl.push(AboutPage);
  }

  Logout() : void
  {
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

  Tocar(queToco)
  {
    console.log(queToco);
  }

  MostrarMensaje(mensaje, posicionAbajo)
  {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: posicionAbajo == true? 'bottom' : 'middle'
    });
    toast.present();
  }

  Grabar()
  {
    //Comienzo a guardar los botones que se ingresan

    console.log("Comienzo la grabacion");

    this.grabar = false;
    this.pararGrabacion = true;
  }

  PararGrabacion()
  {
    //Paro el guardado de botones

    console.log("Paro la grabacion");

    this.pararGrabacion = false;
    this.reproducir = true;
  }

  Reproducir()
  {
    //Permito escuchar la melodia grabada, luego pregunto si la guarda o no.

    console.log("Reproduciendo melodia grabada");

    this.reproducir = false;
    this.grabar = true;
  }

  ReproducirMelodiaGrabada()
  {
    //Reproduzo sonido guardado posteriormente.
    console.log("Reproducir melodia de archivo");
  }

}
