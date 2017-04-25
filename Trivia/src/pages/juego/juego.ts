import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TriviaService } from '../../providers/trivia-service';
import { ToastController } from 'ionic-angular';

import { ResultadoPage } from '../resultado/resultado';

import { Jugador } from '../login/login';

export class Pregunta
{
  constructor(public idPregunta: number, public pregunta : string,
              public resp1 : string, public resp2 : string,
              public resp3 : string, public resp4 : string,
              public correcta : number, public imagenPregunta : string)
  {}
}

@Component({
  selector: 'page-juego',
  templateUrl: 'juego.html',
  providers: [ToastController]
})

export class JuegoPage {

  jugador : Jugador;
  puntajePartida : number = 0;
  preguntas : any;
  preguntaActual : number = 0;
  respuestas : Array <string>;
  preguntaActualEnunciado : string = "";

  inhabilitarBotones : boolean = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public triviaService : TriviaService, public alertCtrl : AlertController)
  {
    this.jugador = navParams.get('Jugador');

    this.preguntas = new Array<Pregunta>();

    this.TraerPreguntas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoPage');
  }

  TraerPreguntas()
  {
    this.triviaService.LeerPreguntas()
      .subscribe(
        ok => {
          if (ok === false)
          {
            this.MostrarAlert("No se pudo recuperar las preguntas. Vuelva a intentarlo");
            this.Volver();
          }

          this.preguntas = ok;

          this.MostrarRespuestas();

        }, 
        error => 
        {
          this.MostrarAlert("No se pudo recuperar las preguntas. Vuelva a intentarlo");
          console.error('Error: ' + error);
          this.Volver();
        },
        () => console.log('Traer Preguntas Completed!')
      );
  }

  MostrarRespuestas()
  {
    this.respuestas = new Array<string>();

    this.respuestas.push(this.preguntas[this.preguntaActual].resp1);
    this.respuestas.push(this.preguntas[this.preguntaActual].resp2);
    this.respuestas.push(this.preguntas[this.preguntaActual].resp3);

    if (this.preguntas[this.preguntaActual].resp4 != null)
      this.respuestas.push(this.preguntas[this.preguntaActual].resp4);

    this.preguntaActualEnunciado = this.preguntas[this.preguntaActual].pregunta;
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
        this.GuardarPartida();
        this.MostrarResultado();
      }
      else
      {
        this.inhabilitarBotones = null;
        this.preguntaActual++;
        this.MostrarRespuestas();
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
            this.MostrarMensaje("No se pudo guardar los datos", true);
        }, 
        error => 
        {
          this.MostrarMensaje("No se pudo guardar los datos", true);
          console.error('Error: ' + error);
        },
        () => console.log('Guardar Datos Jugador Completed!')
      );
  }

  GuardarPartida()
  {
    this.triviaService.GuardarResultados({
      idJugador : this.jugador.idJugador,
      puntaje : this.puntajePartida
    })
      .subscribe(
        ok => {
          if (ok === false)
            this.MostrarMensaje("No se pudo guardar la partida", false);
        }, 
        error => 
        {
          this.MostrarMensaje("No se pudo guardar la partida", false);
          console.error('Error: ' + error);
        },
        () => console.log('Guardar Datos Partida Completed!')
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

  MostrarMensaje(mensaje, posicionAbajo)
  {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: posicionAbajo == true? 'bottom' : 'middle'
    });
    toast.present();
  }

  MostrarAlert(mensaje)
  {
    let alert = this.alertCtrl.create({
      title: "Juego cancelado",
      subTitle: mensaje,
      buttons: ['Ok']
    });
    alert.present();
  }

  Volver()
  {
    this.navCtrl.pop();
  }

}
