import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public triviaService : TriviaService)
  {
    this.partidas = new Array();

    this.TraerResultados();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartidasPage');
  }

  TraerResultados()
  {
    this.triviaService.LeerResultados()
      .subscribe(
        ok => {
          if (ok === false)
            this.sinResultados = true;
          else
            this.partidas = ok;
        }, 
        error => 
        {
          this.errorAlTraerResultados = true;
          console.error('Error: ' + error);
        },
        () => console.log('Traer Partidas Completed!')
      );
  }

  Volver(): void {
    this.navCtrl.pop();
  }

}
