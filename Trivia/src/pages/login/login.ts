import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';

export class UsuarioLogin {
    constructor(public nombre : string = "")
    {}
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [AlertController]
})
export class LoginPage {

  usuario: UsuarioLogin = new UsuarioLogin();

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
    this.navCtrl.push(RegistroPage);
  }

  ValidarUsuario(): boolean       // Conexion con el servidor.
  {
    if (this.usuario.nombre == 'usuario')
      return true; 
    return false;
  }

}
