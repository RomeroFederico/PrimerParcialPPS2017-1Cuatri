import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegistroPage} from '../pages/registro/registro';
import { PrincipalPage} from '../pages/principal/principal';
import { AboutPage} from '../pages/about/about';
import { JuegoPage } from '../pages/juego/juego';
import { ResultadoPage } from '../pages/resultado/resultado';

import { TriviaService } from '../providers/trivia-service'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegistroPage,
    PrincipalPage,
    AboutPage,
    JuegoPage,
    ResultadoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegistroPage,
    PrincipalPage,
    AboutPage,
    JuegoPage,
    ResultadoPage
  ],
  providers: [
    TriviaService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
