import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { RegistroPage } from '../registro/registro';
import { PrincipalPage } from '../principal/principal';

export class Jugador {
    constructor(public idJugador : number = 1, 
                public nombre : string = "", 
                public partidasGanadas : number = 0, 
                public partidasEmpatadas : number = 0,
                public partidasPerdidas : number = 0,
                public jugPiedra : number = 0,
                public jugPapel : number = 0,
                public jugTijera : number = 0,
                public imagen : string = "")
    {}
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [AlertController]
})
export class LoginPage {

  jugador: Jugador = new Jugador();

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login(): void
  {
    console.log("Iniciando sesion para el jugador " + this.jugador.nombre)

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
    // VALIDAR CON BASE DE DATOS
    if (this.jugador.nombre == "Federico")
      this.Login();
    else
    {
      this.MostrarMensaje("Usuario invalido", "El Jugador no se ha registrado.");
      console.log("Login invalido");
    }
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

}
