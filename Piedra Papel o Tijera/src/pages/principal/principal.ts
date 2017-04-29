import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Jugador } from '../login/login';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html'
})
export class PrincipalPage {

  jugador : Jugador;

  habilitar = {
  piedra :  true,
  papel : true,
  tijera : true,
  }

  jugadas = ["piedra", "papel", "tijera"];

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform : Platform) 
  {
    this.jugador = navParams.get('Jugador');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  Jugar(seleccion)
  {
    var eleccionCPU;
    var resultado;
    
    eleccionCPU = Math.floor(Math.random() * (3 - 0)) + 0;

    console.log("CPU jugo " + this.jugadas[eleccionCPU])

    resultado = this.ObtenerResultado(seleccion, this.jugadas[eleccionCPU]);

    console.log(resultado);
  }

  CamibiarEstadoBotones(estado = null)
  {
    this.habilitar.piedra = estado;
    this.habilitar.papel = estado;
    this.habilitar.tijera = estado;
  }

  ObtenerResultado(seleccion, eleccionCPU)
  {
    if (seleccion == "piedra")
    {
      if (eleccionCPU == "piedra")
        return "Empate";
      else if (eleccionCPU == "papel")
        return "Perdio";
      else
        return "Gano";
    }
    else if (seleccion == "papel")
     {
      if (eleccionCPU == "piedra")
        return "Gano";
      else if (eleccionCPU == "papel")
        return "Empate";
      else
        return "Perdio";
     }
     else
     {
      if (eleccionCPU == "piedra")
        return "Perdio";
      else if (eleccionCPU == "papel")
        return "Gano";
      else
        return "Empate";
     }
  }

}
