import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TriviaService } from '../../providers/trivia-service';
import { ToastController } from 'ionic-angular';

import { ResultadoPage } from '../resultado/resultado';

import { Jugador } from '../login/login';

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

  jugador : Jugador;
  puntajePartida : number;
  preguntas : Array <Pregunta>;
  preguntaActual : number;

  inhabilitarBotones : boolean = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public triviaService : TriviaService)
  {
    this.jugador = navParams.get('Jugador');
    this.puntajePartida = 0;
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

  Seleccion(opcion : number) : void 
  {
    this.inhabilitarBotones = true;

    let toast = this.toastCtrl.create({
      duration: 1000,
      position: 'middle'
    });

    if (opcion == this.preguntas[this.preguntaActual].correcta)
    {
      this.puntajePartida++;
      console.log("Correcto");
      toast.setMessage("Correcto");
    }
    else
    {
      console.log("Incorrecto");
      toast.setMessage("Incorrecto");
    }

    toast.onDidDismiss(() => {

      if (this.preguntaActual == 2)
      {
        console.log("Juego Terminado");
        this.CalcularResultado();
        this.GuardarResultado();
        this.MostrarResultado();
      }
      else
      {
        this.inhabilitarBotones = null;
        this.preguntaActual++;
      }

    });

    toast.present();
  }

  CalcularResultado()
  {
    //Implementar tiempo.
    this.jugador.partidasJugadas++;
    this.jugador.puntaje += this.puntajePartida;
    this.jugador.respCorrectas += this.puntajePartida;
    this.jugador.respIncorrectas += 3 - this.puntajePartida;
  }

  GuardarResultado()
  {
    this.triviaService.ModificarUsuario(this.jugador, this.jugador.idJugador)
      .subscribe(
        ok => {
          if (ok === false)
            this.MostrarMensaje("No se pudo guardar los datos");
        }, 
        error => 
        {
          this.MostrarMensaje("No se pudo guardar los datos");
          console.error('Error: ' + error);
        },
        () => console.log('Guardar Datos Jugador Completed!')
      );
  }

  MostrarResultado()
  {
    this.navCtrl.setRoot(ResultadoPage, {
      Jugador : this.jugador,
      Puntaje : this.puntajePartida,
      Tiempo : 0
      }, {
          animate: true, 
          direction: "forward"
    });
  }

  MostrarMensaje(mensaje)
  {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: 'middle'
    });
    toast.present();
  }

}
