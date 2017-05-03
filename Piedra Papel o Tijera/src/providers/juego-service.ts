import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JuegoService {

  constructor(public http: Http) {
    console.log('Hello JuegoService Provider');
  }

  BuscarUsuario(nombre)
  {
    var body =  JSON.stringify(nombre);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
      .post('http://www.romerofederico.hol.es/slimPiedraPapelOTijera/ws/administracion.php/login', body, { headers: headers })
      .map(response => response.json());
  }

  AgregarUsuario(datosAgregar)
  {
    var body =  JSON.stringify(datosAgregar);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
      .post('http://www.romerofederico.hol.es/slimPiedraPapelOTijera/ws/administracion.php/registro', body, { headers: headers })
      .map(response => response.json());
  }

  ModificarUsuario(datosModificar, idModificar)
  {
    var body =  JSON.stringify(datosModificar);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
      .put('http://www.romerofederico.hol.es/slimPiedraPapelOTijera/ws/administracion.php/usuario/' + idModificar, body, { headers: headers })
      .map(response => response.json());
  }

  LeerResultados()
  {
    return this.http.get('http://www.romerofederico.hol.es/slimPiedraPapelOTijera/ws/administracion.php/resultados')
      .map(response => response.json());
  }

  GuardarResultados(datosAgregar)
  {
    var body =  JSON.stringify(datosAgregar);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
      .post('http://www.romerofederico.hol.es/slimPiedraPapelOTijera/ws/administracion.php/resultados/agregar' , body, { headers: headers })
      .map(response => response.json());
  }
}
