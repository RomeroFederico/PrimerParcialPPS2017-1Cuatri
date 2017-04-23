import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PrincipalPage } from '../principal/principal';

import { Jugador } from '../login/login';

@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html'
})
export class ResultadoPage {

  tiempo : number;
  jugador : Jugador;
  puntajePartida : number;

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.jugador = navParams.get('Jugador');
    this.puntajePartida = navParams.get('Puntaje');
    this.tiempo = navParams.get('Tiempo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPage');
  }

  Volver(): void {

    this.navCtrl.setRoot(PrincipalPage, {
      Jugador : this.jugador
    }, {
      animate: true, 
      direction: "forward"
    });

  }

}
