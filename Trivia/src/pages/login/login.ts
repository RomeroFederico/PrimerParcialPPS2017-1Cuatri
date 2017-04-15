import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { PrincipalPage } from '../principal/principal';

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
  providers : [AlertController]
})
export class LoginPage {

  jugador: Jugador = new Jugador();

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login(): void {
  if (this.ValidarUsuario())
  {
    console.log("Iniciando Sesion");  // Acceso a Pagina Principal.
    this.navCtrl.setRoot(PrincipalPage, {
      Jugador : this.jugador
    }, {
      animate: true, 
      direction: "forward"
    });
  }
  else
  	{
      console.log("Email y/o Password incorrecto!!!");
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'El usuario ingresado no existe!!!',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  Registrar(): void 
  {
    this.navCtrl.push(RegistroPage, {
      Jugador : this.jugador
    });
  }

  ValidarUsuario(): boolean       // Conexion con el servidor.
  {
    if (this.jugador.nombre == 'usuario' || this.jugador.nombre == 'federico')
      return true; 
    return false;
  }

}
