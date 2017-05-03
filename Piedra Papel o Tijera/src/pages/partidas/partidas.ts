import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { JuegoService } from '../../providers/juego-service';

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
              public loadingController : LoadingController,
              public juegoService : JuegoService)
  {
    this.TraerResultados();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartidasPage');
  }

  TraerResultados()
  {
    console.log("Trayendo resultados");

    this.MostrarLoading();

    this.juegoService.LeerResultados()
      .subscribe(
        ok => {

          this.loading.dismiss();

          if (ok === false)
            this.sinResultados = true;
          else
            this.OrganizarPartidas(ok);

            this.Seleccion("Victorias");
        }, 
        error => 
        {
          this.loading.dismiss();
          this.errorAlTraerResultados = true;
          this.Seleccion("Victorias");
          console.error('Error: ' + error);
        },
        () => console.log('Traer Partidas Completed!')
      );
  }

  OrganizarPartidas(partidas)
  {
    partidas.forEach(element => {
      if (element.estado == "Victoria")
        this.partidas.Victorias.push(element);
      else if (element.estado == "Empate")
        this.partidas.Empates.push(element);
      else
        this.partidas.Derrotas.push(element);
    });
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

    if (this.errorAlTraerResultados)
      return;

    if (this.partidas[seleccion].length == 0)
      this.sinResultados = true;
    else
      this.sinResultados = false;
  }
}
