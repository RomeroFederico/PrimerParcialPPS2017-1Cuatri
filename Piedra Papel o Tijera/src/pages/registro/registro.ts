import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Jugador } from '../login/login';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  jugador : Jugador;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController) 
  {
    this.jugador = navParams.get('Jugador');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  RegistrarUsuario() : void 
  {
    // Registrar en Base de Datos y, en caso de exito, ir a la pagina principal / juego
  }

  Login(jugador): void
  {
    console.log("Iniciando sesion para el jugador " + this.jugador.nombre)
    // IR A PAGINA PRINCIPAL / JUEGO
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

}
