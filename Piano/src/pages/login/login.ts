import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';

import { RegistroPage } from '../registro/registro';
import { PrincipalPage } from '../principal/principal';

export class Jugador {
    constructor(public idJugador : number = 1, 
                public nombre : string = "",
                public tieneArchivo : boolean = false)
    {}
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [AlertController]
})
export class LoginPage {

  jugador: Jugador = new Jugador();
  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private alertCtrl: AlertController, public loadingController : LoadingController)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login(): void
  {
    console.log("Iniciando sesion para el jugador " + this.jugador.nombre);

    this.navCtrl.setRoot(PrincipalPage, {
      Jugador : this.jugador
    }, {
      animate: true, 
      direction: "forward"
    });
  }

  Registrar(): void 
  {
    this.navCtrl.push(RegistroPage, {
      Jugador : this.jugador
    });
  }

  ValidarUsuario()
  {
    if (!this.ValidarNombreJugador())
      return;

    //Validar con Base de Datos
    if (this.jugador.nombre == "Federico")
      this.Login();
    else
      this.MostrarMensaje("Error", "Usuario invalido");
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
