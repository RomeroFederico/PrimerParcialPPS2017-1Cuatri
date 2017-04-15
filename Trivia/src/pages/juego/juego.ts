import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { Usuario } from '../login/login';

export class Pregunta
{
  constructor(public pregunta : string, public respuestas : Array <string>, public correcta : number)
  {}
}

@Component({
  selector: 'page-juego',
  templateUrl: 'juego.html',
  providers: [ToastController]
})

export class JuegoPage {

  jugador : Usuario;
  puntaje : number;
  preguntas : Array <Pregunta>;
  preguntaActual : number;

  inhabilitarBotones : boolean = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController)
  {
    this.jugador = navParams.get('jugador');
    this.puntaje = 0;
    this.preguntas = new Array<Pregunta>();

    // Traer preguntas de la base de datos.
    this.preguntas.push(new Pregunta("1+1", ["1", "2", "3"], 1));
    this.preguntas.push(new Pregunta("1+2", ["1", "2", "3"], 2));
    this.preguntas.push(new Pregunta("1+3", ["4", "2", "3"], 0));

    this.preguntaActual = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoPage');
  }

  Seleccion(opcion : number) : void {

    this.inhabilitarBotones = true;

    let toast = this.toastCtrl.create({
      duration: 1000,
      position: 'middle'
    });

    if (opcion == this.preguntas[this.preguntaActual].correcta)
    {
      this.puntaje++;
      console.log("Correcto");
      toast.setMessage("Correcto");
    }
    else
    {
      console.log("Incorrecto");
      toast.setMessage("Inorrecto");
    }

    toast.onDidDismiss(() => {

      if (this.preguntaActual == 2)
        console.log("Juego Terminado");
      else
      {
        this.inhabilitarBotones = null;
        this.preguntaActual++;
      }

    });

    toast.present();
  }

}
