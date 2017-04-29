import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TriviaService } from '../../providers/trivia-service';

/*
  Generated class for the Partidas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-partidas',
  templateUrl: 'partidas.html'
})
export class PartidasPage {

  partidas : any;
  sinResultados : boolean = false;
  errorAlTraerResultados : boolean = false;

  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public loadingController : LoadingController,
              public triviaService : TriviaService)
  {
    this.partidas = new Array();

    this.TraerResultados();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartidasPage');
  }

  TraerResultados()
  {
    this.MostrarLoading();

    this.triviaService.LeerResultados()
      .subscribe(
        ok => {

          this.loading.dismiss();

          if (ok === false)
            this.sinResultados = true;
          else
            this.partidas = ok;
        }, 
        error => 
        {
          this.loading.dismiss();
          this.errorAlTraerResultados = true;
          console.error('Error: ' + error);
        },
        () => console.log('Traer Partidas Completed!')
      );
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

}
