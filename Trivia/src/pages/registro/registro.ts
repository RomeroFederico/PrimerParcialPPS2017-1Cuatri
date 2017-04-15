import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Jugador } from '../login/login';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  jugador : Jugador;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.jugador = navParams.get('Jugador');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  RegistrarUsuario() : void {
    // Registrar y enviar al formulario principal en caso de exito.
  }

  Cancelar() : void {
    this.navCtrl.pop();
  }

}
