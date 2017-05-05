import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Jugador } from '../login/login';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  jugador : Jugador;

  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl : AlertController, public loadingController : LoadingController) 
  {
    this.jugador = navParams.get('Jugador');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  RegistrarUsuario() : void 
  {
    if (!this.ValidarNombreJugador())
      return;

    //Si usuario no existe en la Base de Datos, registro.
    this.Login(this.jugador);
  }

  Login(jugador): void
  {
    console.log("Iniciando sesion para el jugador " + this.jugador.nombre);
  }

  Cancelar() : void {
    this.navCtrl.pop();
  }

  MostrarMensaje(titulo, mensaje)
  {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Ok']
    });
    alert.present();
  }

  MostrarLoading() 
  {
    let loading = this.loadingController.create({
      spinner: 'bubbles',
      content: `Cargando, 
      Por Favor Espere un Momento...`,
    });

    this.loading = loading;

    this.loading.present();
  }

  ValidarNombreJugador() : boolean
  {
    if (this.jugador.nombre.length == 0)
    {
      this.MostrarMensaje("Error", "No se ingreso un nombre");
      return false;
    }
    else if (this.jugador.nombre.length > 20)
    {
      this.MostrarMensaje("Error", "El nombre ingresado es demasiado largo");
      return false;
    }
    return true;
  }

}
