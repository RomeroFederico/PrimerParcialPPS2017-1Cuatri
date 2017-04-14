import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { PrincipalPage } from '../principal/principal';

export class Usuario {
    constructor(public nombre : string = "")
    {}
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [AlertController]
})
export class LoginPage {

  usuario: Usuario = new Usuario();

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
      Usuario : this.usuario
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
      Usuario : this.usuario
    });
  }

  ValidarUsuario(): boolean       // Conexion con el servidor.
  {
    if (this.usuario.nombre == 'usuario' || this.usuario.nombre == 'federico')
      return true; 
    return false;
  }

}
