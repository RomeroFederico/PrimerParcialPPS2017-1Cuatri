import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';

import { RegistroPage } from '../registro/registro';
import { PrincipalPage } from '../principal/principal';

import { PianoService } from '../../providers/piano-service';

export class Jugador {
    constructor(public idJugador : number = 1, 
                public nombre : string = "")
    {}
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [AlertController, PianoService]
})
export class LoginPage {

  jugador: Jugador = new Jugador();
  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private alertCtrl: AlertController, public loadingController : LoadingController,
              public pianoService : PianoService)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login(): void
  {
    console.log("Iniciando sesion para el jugador " + this.jugador.nombre);

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

    this.pianoService.BuscarUsuario({nombre : this.jugador.nombre})
      .subscribe(
        ok => {

          this.loading.dismiss();

          if (ok.exito == true)
          {
            this.jugador = ok.usuario;

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
