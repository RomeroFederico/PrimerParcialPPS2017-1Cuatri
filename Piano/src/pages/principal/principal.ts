import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';

import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';

import { Jugador } from '../login/login';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
  providers: [ToastController, Vibration, NativeAudio]
})
export class PrincipalPage {

  jugador : Jugador;

  secuencia : Array<string>;
  posicion = 0;

  inhabilitarBotones : boolean = null;

  grabar : boolean = true;
  pararGrabacion : boolean = false;
  reproducir : boolean = false;

  mensaje : string = "";

  exitoAlCargarSonido = 
  {
    encender : false,
    motor : false,
    puerta : false,
    rueda : false,
    velocidad : false,
    velocidadmaxima : false,
    bocina : false,
    choque : false
  }

  melodiaFinalizada = false;

  accionBoton = "Grabar";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl : AlertController, public toastCtrl : ToastController,
              public vibration : Vibration, public native : NativeAudio) 
  {
    this.jugador = navParams.get('Jugador');

    this.secuencia = new Array<string>();

    this.CargarSonidos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  MostrarAbout() : void 
  {
    console.log("Mostrar About");
    this.navCtrl.push(AboutPage);
  }

  Logout() : void
  {
    let alert = this.alertCtrl.create({
      title: 'Cerrar Sesion...',
      message: '¿Desea Cerrar la Sesion?',
      buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('No se Cerro la Sesion.');
        }
      },
      {
        text: 'Ok',
        handler: () => {

          this.EliminarSonidos();

          console.log('Cerrando Sesion.');
          this.navCtrl.setRoot(LoginPage, {}, {
          animate: true, 
          direction: "backward"
          });
        }
      }
    ]
    });
    alert.present();
  }

  Tocar(queToco)
  {
    if (this.inhabilitarBotones == true)
      return;

    console.log(queToco);

    if (this.pararGrabacion == true)
      this.secuencia.push(queToco);

    this.mensaje = "Reproduciendo " + queToco;

    this.vibration.vibrate(300);
    this.ReproducirSonido(queToco);
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

  MostrarAlert(titulo, mensaje)
  {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Ok']
    });
    alert.present();
  }

  Accion()
  {
    //Comienzo a guardar los botones que se ingresan
    if (this.inhabilitarBotones == true)
      return;

    if (this.accionBoton == "Grabar")
    {
      console.log("Comienzo la grabacion");

      this.grabar = false;
      this.pararGrabacion = true;
      this.accionBoton = "Parar Grabacion";
    }
    else if (this.accionBoton == "Parar Grabacion")
    {
      this.PararGrabacion();
    }
    else if (this.accionBoton == "Reproducir")
    {
      this.Reproducir();
    }
  }

  PararGrabacion()
  {
    //Paro el guardado de botones

    console.log("Paro la grabacion");

    this.pararGrabacion = false;

    if (this.secuencia.length == 0)
    {
      console.log("No se ha grabado ningun sonido, el usuario no presiono teclas.");
      this.mensaje = "No se ha grabado ningun sonido, el usuario no presiono teclas.";
      this.grabar = true;
      this.accionBoton = "Grabar";
    }
    else
    {
      this.reproducir = true;
      this.accionBoton = "Reproducir";
    }
  }

  Reproducir()
  {
    //Permito escuchar la melodia grabada, luego pregunto si la guarda o no.

    console.log("Reproduciendo melodia grabada");
    console.log(this.secuencia);

    this.mensaje = "Reproduciendo grabacion";

    var melodia = "";
    
    this.secuencia.forEach(element => {
      melodia += element + "-";
    });

    console.log(melodia);

    this.posicion = 0;
    this.melodiaFinalizada = false;

    this.inhabilitarBotones = true;

    this.ReproducirMelodia();
  }

  ReproducirMelodiaGrabada()
  {
    if (this.inhabilitarBotones == true)
      return;

    //Reproduzo sonido guardado posteriormente.
    console.log("Reproducir melodia de archivo");
  }

  CargarSonidos()
  {
    this.native.preloadSimple('encender', 'assets/sound/Encender.mp3')
      .then(
        resp => {
          this.exitoAlCargarSonido.encender = true;
          console.log("Exito al cargar sonido 'encender'. " + resp);
        },
        err => { console.log("Error al cargar el sonido 'encender'. " + err); });

      this.native.preloadSimple('motor', 'assets/sound/Motor.WAV')
      .then(
        resp => {
          this.exitoAlCargarSonido.motor = true;
          console.log("Exito al cargar sonido 'motor'. " + resp);
        },
        err => { console.log("Error al cargar el sonido 'motor'. " + err); }); 
    
      this.native.preloadSimple('puerta', 'assets/sound/Puerta.mp3')
      .then(
        resp => {
          this.exitoAlCargarSonido.puerta = true;
          console.log("Exito al cargar sonido 'puerta'. " + resp);
        },
        err => { console.log("Error al cargar el sonido 'puerta'. " + err); });

      this.native.preloadSimple('rueda', 'assets/sound/Rueda.WAV')
      .then(
        resp => {
          this.exitoAlCargarSonido.rueda = true;
          console.log("Exito al cargar sonido 'rueda'. " + resp);
        },
        err => { console.log("Error al cargar el sonido 'rueda'. " + err); });

      this.native.preloadSimple('velocidad', 'assets/sound/Velocidad.mp3')
      .then(
        resp => {
          this.exitoAlCargarSonido.velocidad = true;
          console.log("Exito al cargar sonido 'velocidad'. " + resp);
        },
        err => { console.log("Error al cargar el sonido 'velocidad'. " + err); });  

      this.native.preloadSimple('velocidadmaxima', 'assets/sound/MaximaVelocidad.mp3')
      .then(
        resp => {
          this.exitoAlCargarSonido.velocidadmaxima = true;
          console.log("Exito al cargar sonido 'velocidadmaxima'. " + resp);
        },
        err => { console.log("Error al cargar el sonido 'velocidadmaxima'. " + err); }); 

      this.native.preloadSimple('bocina', 'assets/sound/Bocina.WAV')
      .then(
        resp => {
          this.exitoAlCargarSonido.bocina = true;
          console.log("Exito al cargar sonido 'bocina'. " + resp);
        },
        err => { console.log("Error al cargar el sonido 'bocina'. " + err); }); 

      this.native.preloadSimple('choque', 'assets/sound/Choque.mp3')
      .then(
        resp => {
          this.exitoAlCargarSonido.choque = true;
          console.log("Exito al cargar sonido 'choque'. " + resp);
        },
        err => { console.log("Error al cargar el sonido 'choque'. " + err); });   
  }

  ReproducirSonido(sonido)
  {
    if (!(this.exitoAlCargarSonido[sonido]))
    {
      this.mensaje = "Error, el sonido " + sonido + " no se ha cargado";
      console.log("No se pudo reproducir el sonido " + sonido + " por que no se cargo. ");
      return;
    }
    this.native.play(sonido, () => {
      this.inhabilitarBotones = null;
      this.LimpiarMensaje();
      console.log(sonido + " se termino de reproducir.");
    })
      .then(
        resp => {
          this.inhabilitarBotones = true;
          console.log("Exito al reproducir el sonido. " + resp);
        },
        err => { console.log("Error al reproducir el sonido. " + err); });
  }

  ReproducirMelodia()
  {
    console.log("Posicion " + this.posicion + ", la secuencia tiene " + this.secuencia.length);
    if (this.posicion == this.secuencia.length)
    {
      this.FinalizarMelodia();
      return;
    }

    var sonido = this.secuencia[this.posicion];

    this.posicion++;

    if (!(this.exitoAlCargarSonido[sonido]))
    {
      this.mensaje = "Error, el sonido " + sonido + " no se ha cargado";
      console.log("No se pudo reproducir el sonido " + sonido + " por que no se cargo. ");
      this.ReproducirMelodia();
    }

    if(this.melodiaFinalizada)
      return;

    this.native.play(sonido, () => {

      console.log(sonido + " se termino de reproducir.");
      this.ReproducirMelodia();
    })
      .then(
        resp => {
          console.log("Exito al reproducir el sonido. " + resp);
        },
        err => { console.log("Error al reproducir el sonido. " + err); this.ReproducirMelodia(); });
  }

  FinalizarMelodia()
  {
    //Muestro opcion de guardar

    this.secuencia = new Array<string>();

    console.log("Estado de botones: grabar => " + this.grabar + ", pararGrabar => " + this.pararGrabacion + ", reproducir => " + this.reproducir);

    this.reproducir = false;
    this.grabar = true;

    console.log("Estado de botones: grabar => " + this.grabar + ", pararGrabar => " + this.pararGrabacion + ", reproducir => " + this.reproducir);

    this.melodiaFinalizada = true;

    this.accionBoton = "Grabar";

    this.inhabilitarBotones = null;
  }

  EliminarSonidos()
  {
    if (this.exitoAlCargarSonido.bocina)
      this.native.unload("bocina");
    if (this.exitoAlCargarSonido.choque)
      this.native.unload("choque");
    if (this.exitoAlCargarSonido.encender)
      this.native.unload("encender");
    if (this.exitoAlCargarSonido.motor)
      this.native.unload("motor");
    if (this.exitoAlCargarSonido.puerta)
      this.native.unload("puerta");
    if (this.exitoAlCargarSonido.rueda)
      this.native.unload("rueda");
    if (this.exitoAlCargarSonido.velocidad)
      this.native.unload("velocidad");
    if (this.exitoAlCargarSonido.velocidadmaxima)
      this.native.unload("velocidadmaxima");
  }

  LimpiarMensaje()
  {
    this.mensaje = "";
    console.log("Paso por limpiar");
  }
}
