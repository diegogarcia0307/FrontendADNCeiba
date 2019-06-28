import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../class/vehiculo';


export const URL = '/apiv1/alquileres/';


@Injectable({
  providedIn: 'root'
})

export class ConexionBDService {

  constructor(
    private http: HttpClient
  ) { }

  private header = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  obtenerLista(): Observable<any> {
    return this.http.get<any>(URL, { headers: this.header });
  }

  obtenerAlquiler(placa: String): Observable<any> {
    const url = `${URL}${placa}`;
    return this.http.get<any>(url, { headers: this.header });
  }

  darSalida(placa: String): Observable<number> {
    const url = `${URL}${placa}`;

    return this.http.put<number>(url, { headers: this.header });
  }

  ingresarVehiculo(vehiculo: Vehiculo) {
    return this.http.post(URL, { vehiculo: vehiculo });
  }
}
