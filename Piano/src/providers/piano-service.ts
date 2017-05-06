import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PianoService {

  constructor(public http: Http) {
    console.log('Hello JuegoService Provider');
  }

  BuscarUsuario(nombre)
  {
    var body =  JSON.stringify(nombre);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
      .post('http://www.romerofederico.hol.es/slimPiano/ws/administracion.php/login', body, { headers: headers })
      .map(response => response.json());
  }

  AgregarUsuario(datosAgregar)
  {
    var body =  JSON.stringify(datosAgregar);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
      .post('http://www.romerofederico.hol.es/slimPiano/ws/administracion.php/registro', body, { headers: headers })
      .map(response => response.json());
  }

}
