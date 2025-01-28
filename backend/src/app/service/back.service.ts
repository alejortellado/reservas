import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class BackService {
  constructor(private _http: HttpClient) {
  }

  private direccion = 'http://localhost:5000'

  getPersonas() {
    return this._http.get(this.direccion + '/personas');
  }

  editarPersona(id,jsonData){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this._http.put(this.direccion + '/personas/'+id, jsonData, { headers: headers });
  }

  crearPersona(jsonData){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this._http.post(this.direccion + '/personas', jsonData, { headers: headers });
  }

  eliminarPersona(id){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this._http.delete(this.direccion + '/personas/'+id, { headers: headers });
  }

  getHabitaciones() {
    return this._http.get(this.direccion + '/habitaciones');
  }

  editarHabitacion(id,jsonData){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this._http.put(this.direccion + '/habitaciones/'+id, jsonData, { headers: headers });
  }

  crearHabitacion(jsonData){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this._http.post(this.direccion + '/habitaciones', jsonData, { headers: headers });
  }

  eliminarHabitacion(id){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this._http.delete(this.direccion + '/habitaciones/'+id, { headers: headers });
  }

  getReservas() {
    return this._http.get(this.direccion + '/reservas');
  }

  editarReserva(id,jsonData){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this._http.put(this.direccion + '/reservas/'+id, jsonData, { headers: headers });
  }

  crearReserva(jsonData){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this._http.post(this.direccion + '/reservas', jsonData, { headers: headers });
  }

  eliminarReserva(id){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this._http.delete(this.direccion + '/reservas/'+id, { headers: headers });
  }
}
