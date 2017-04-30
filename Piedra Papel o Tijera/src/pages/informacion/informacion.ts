import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Jugador } from '../login/login';

@Component({
  selector: 'page-informacion',
  templateUrl: 'informacion.html'
})
export class InformacionPage {

  jugador : Jugador;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.jugador = navParams.get('Jugador');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacionPage');
  }

  Volver()
  {
    this.navCtrl.pop();
  }

}
