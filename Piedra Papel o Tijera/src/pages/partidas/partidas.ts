import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-partidas',
  templateUrl: 'partidas.html'
})
export class PartidasPage {

  partidas = {Victorias : new Array(), Empates : new Array(), Derrotas : new Array()};
  sinResultados : boolean = false;
  errorAlTraerResultados : boolean = false;
  resultados : string = "Victorias";

  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public loadingController : LoadingController)
  {
    this.TraerResultados();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartidasPage');
  }

  TraerResultados()
  {
    console.log("Trayendo resultados");

    // Traer de la Base de Datos.

    this.partidas.Victorias.push({fecha : new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(), nombre : "Federico"});
    this.partidas.Victorias.push({fecha : new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(), nombre : "Federico"});
    this.partidas.Derrotas.push({fecha : new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(), nombre : "Federico"});

    // Si se pudo

    this.Seleccion("Victorias");
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

  Volver(): void {
    this.navCtrl.pop();
  }

  Seleccion(seleccion)
  {
    console.log("Se selecciono partidas " + seleccion);

    if (this.partidas[seleccion].length == 0)
      this.sinResultados = true;
    else
      this.sinResultados = false;
  }
}
