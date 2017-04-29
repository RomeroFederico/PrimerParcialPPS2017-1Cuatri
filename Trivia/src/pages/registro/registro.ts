import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { TriviaService } from '../../providers/trivia-service';

import { PrincipalPage } from '../principal/principal';

import { Jugador } from '../login/login';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  jugador : Jugador;

  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public triviaService : TriviaService, 
              public alertCtrl : AlertController, public loadingController : LoadingController) 
  {
    this.jugador = navParams.get('Jugador');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  RegistrarUsuario() : void 
  {
    this.MostrarLoading();

    this.triviaService.AgregarUsuario({nombre : this.jugador.nombre})
      .subscribe(
        ok => {

          this.loading.dismiss();

          this.MostrarMensaje(ok.exito? "Informacion" : "Error", ok.mensaje);
          if (ok.exito == true)
            this.Login(this.ArreglarTipos(ok.jugador));
        }, 
        error => 
        {
          this.loading.dismiss();
          this.MostrarMensaje("Error", "Ha ocurrido un error, vuelva a intentarlo.");
          console.error('Error: ' + error);
        },
        () => console.log('Registro Completed!')
      );
  }

  Login(jugador): void
  {
    console.log("Iniciando Sesion");

    this.navCtrl.setRoot(PrincipalPage, {
      Jugador : jugador
    }, {
      animate: true, 
      direction: "forward"
    });
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

  MostrarLoading() 
  {
    let loading = this.loadingController.create({
      spinner: 'bubbles',
      content: `Cargando, 
      Por Favor Espere un Momento...`,
    });

    this.loading = loading;

    this.loading.present();
  }

  ArreglarTipos(jugador)
  {
    if (typeof(this.jugador.puntaje) === "string")
      jugador.puntaje = +jugador.puntaje;
    if (typeof(this.jugador.partidasJugadas) === "string")
      jugador.partidasJugadas = +jugador.partidasJugadas;
    if (typeof(this.jugador.respCorrectas) === "string")
      jugador.respCorrectas = +jugador.respCorrectas;
    if (typeof(this.jugador.respIncorrectas) === "string")
      jugador.respIncorrectas = +jugador.respIncorrectas;
    if (typeof(this.jugador.idJugador) === "string")
      jugador.idJugador = +jugador.idJugador;

    return jugador;
  }

}
