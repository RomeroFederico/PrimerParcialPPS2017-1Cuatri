import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { PrincipalPage } from '../principal/principal';

import { TriviaService } from '../../providers/trivia-service';

export class Jugador {
    constructor(public idJugador : number = 1, public nombre : string = "", 
                public puntaje : number = 0, public partidasJugadas : number = 0,
                public respCorrectas : number = 0, public respIncorrectas : number = 0,
                public imagen : string = "")
    {}
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [AlertController, TriviaService]
})
export class LoginPage {

  jugador: Jugador = new Jugador();

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public triviaService : TriviaService)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login(): void
  {
    console.log("Iniciando Sesion");

    this.navCtrl.setRoot(PrincipalPage, {
      Jugador : this.jugador
    }, {
      animate: true, 
      direction: "forward"
    });
  }

  Registrar(): void 
  {
    this.navCtrl.push(RegistroPage, {
      Jugador : this.jugador
    });
  }

  ValidarUsuario()
  {
    this.triviaService.BuscarUsuario({nombre : this.jugador.nombre})
      .subscribe(
        ok => {
          console.log(ok.mensaje);

          if (ok.exito == true)
          {
            this.jugador = ok.usuario;
            this.Login();
          }
          else
            this.MostrarMensaje("Error", ok.mensaje);
        }, 
        error => console.error('Error: ' + error),
        () => console.log('Alta Completed!')
      );
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

}
