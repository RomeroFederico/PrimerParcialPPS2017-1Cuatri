import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';

import { RegistroPage } from '../registro/registro';
import { PrincipalPage } from '../principal/principal';

import { JuegoService } from '../../providers/juego-service';

export class Jugador {
    constructor(public idJugador : number = 1, 
                public nombre : string = "",
                public partidas : number = 0, 
                public partidasGanadas : number = 0, 
                public partidasEmpatadas : number = 0,
                public partidasPerdidas : number = 0,
                public jugPiedra : number = 0,
                public jugPapel : number = 0,
                public jugTijera : number = 0,
                public imagen : string = "")
    {}
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [AlertController, JuegoService]
})
export class LoginPage {

  jugador: Jugador = new Jugador();
  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private alertCtrl: AlertController, public loadingController : LoadingController,
              public juegoService : JuegoService)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login(): void
  {
    console.log("Iniciando sesion para el jugador " + this.jugador.nombre)

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
    if (!this.ValidarNombreJugador())
      return;

    this.MostrarLoading();

    this.juegoService.BuscarUsuario({nombre : this.jugador.nombre})
      .subscribe(
        ok => {

          this.loading.dismiss();

          if (ok.exito == true)
          {
            this.jugador = ok.usuario;

            this.jugador = this.ArreglarTipos(this.jugador);

            this.Login();
          }
          else
            this.MostrarMensaje("Error", ok.mensaje);
        }, 
        error => 
        {
          this.loading.dismiss();
          this.MostrarMensaje("Error", "Ha ocurrido un error, vuelva a intentarlo.");
          console.error('Error: ' + error);
        },
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
    if (typeof(this.jugador.idJugador) === "string")
      jugador.idJugador = +jugador.idJugador;
    if (typeof(this.jugador.partidas) === "string")
      jugador.partidas = +jugador.partidas;
    if (typeof(this.jugador.partidasGanadas) === "string")
      jugador.partidasGanadas = +jugador.partidasGanadas;
    if (typeof(this.jugador.partidasEmpatadas) === "string")
      jugador.partidasEmpatadas = +jugador.partidasEmpatadas;
    if (typeof(this.jugador.partidasPerdidas) === "string")
      jugador.partidasPerdidas = +jugador.partidasPerdidas;
    if (typeof(this.jugador.jugPiedra) === "string")
      jugador.jugPiedra = +jugador.jugPiedra;
    if (typeof(this.jugador.jugPapel) === "string")
      jugador.jugPapel = +jugador.jugPapel;
    if (typeof(this.jugador.jugTijera) === "string")
      jugador.jugTijera = +jugador.jugTijera;

    return jugador;
  }

  ValidarNombreJugador() : boolean
  {
    if (this.jugador.nombre.length == 0)
    {
      this.MostrarMensaje("Error", "No se ingreso un nombre");
      return false;
    }
    else if (this.jugador.nombre.length > 20)
    {
      this.MostrarMensaje("Error", "El nombre ingresado es demasiado largo");
      return false;
    }
    return true;
  }

}
