import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Jugador } from '../login/login';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html'
})
export class PrincipalPage {

  jugador : Jugador;

  //Logica Partida
  habilitar = {
  piedra :  true,
  papel : true,
  tijera : true,
  }

  habilitarCPU = {
  piedra :  true,
  papel : true,
  tijera : true,
  }

  jugadas = ["piedra", "papel", "tijera"];

  resultado : string = "";
  mostrarResultado : boolean = null;

  //Animacion y Estetica
  clsImagen : string = "animated pulse infinite";
  clsImagenCPU : string = "animated flip infinite";
  colorResultado : any;
  coloresParaResultados = {
    Derrota : {'color' : 'red'},
    Empate : {'color' : 'orange'},
    Victoria : {'color' : 'green'}
  }
  clsResultado : string;
  clsResultadoBoton : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform : Platform) 
  {
    this.jugador = navParams.get('Jugador');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  Jugar(seleccion)
  {
    if (this.mostrarResultado)
      return;

    this.CamibiarEstadoBotones();
    this.habilitar[seleccion] = true;
    this.clsImagen = "animated fadeOutUp infinite";
    this.clsImagenCPU = "animated fadeOutDown infinite";

    var eleccionCPU;
    
    eleccionCPU = Math.floor(Math.random() * (3 - 0)) + 0;
    this.CambiarEstadoBotonesCPU();
    this.habilitarCPU[this.jugadas[eleccionCPU]] = true;

    console.log(this.jugador.nombre + " jugo " + seleccion);
    console.log("CPU jugo " + this.jugadas[eleccionCPU])

    this.resultado = this.ObtenerResultado(seleccion, this.jugadas[eleccionCPU]);
    this.clsResultado = "animated zoomIn";
    this.clsResultadoBoton = "animated rotateIn infinite";
    this.mostrarResultado = true;
    this.colorResultado = this.coloresParaResultados[this.resultado];

    console.log(this.resultado);
  }

  CamibiarEstadoBotones(estado = null)
  {
    this.habilitar.piedra = estado;
    this.habilitar.papel = estado;
    this.habilitar.tijera = estado;
  }

  CambiarEstadoBotonesCPU(estado = null)
  {
    this.habilitarCPU.piedra = estado;
    this.habilitarCPU.papel = estado;
    this.habilitarCPU.tijera = estado; 
  }

  ObtenerResultado(seleccion, eleccionCPU)
  {
    if (seleccion == "piedra")
    {
      if (eleccionCPU == "piedra")
        return "Empate";
      else if (eleccionCPU == "papel")
        return "Derrota";
      else
        return "Victoria";
    }
    else if (seleccion == "papel")
     {
      if (eleccionCPU == "piedra")
        return "Victoria";
      else if (eleccionCPU == "papel")
        return "Empate";
      else
        return "Derrota";
     }
     else
     {
      if (eleccionCPU == "piedra")
        return "Derrota";
      else if (eleccionCPU == "papel")
        return "Victoria";
      else
        return "Empate";
     }
  }

  Reiniciar()
  {
    this.CamibiarEstadoBotones(true);
    this.CambiarEstadoBotonesCPU(true);

    this.clsImagen = "animated pulse infinite";
    this.clsImagenCPU = "animated flip infinite";
    this.clsResultado = "";
    this.clsResultadoBoton = "";

    this.mostrarResultado = null;

    console.log("Nueva Partida");
  }

}
