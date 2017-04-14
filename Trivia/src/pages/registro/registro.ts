import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Usuario } from '../login/login';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  usuario : Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.usuario = navParams.get('Usuario');
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
