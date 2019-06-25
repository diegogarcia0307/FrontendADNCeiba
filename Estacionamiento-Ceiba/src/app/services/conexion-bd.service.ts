import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../class/vehiculo';


export const URL = 'http://localhost:8080';


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
    const url = `${URL}/apiv1/alquileres/`;
    return this.http.get<any>(url, { headers: this.header });
  }

  obtenerAlquiler(placa: String): Observable<any> {
    const url = `${URL}/apiv1/alquileres/${placa}`;
    return this.http.get<any>(url, { headers: this.header });
  }

  darSalida(placa: String): Observable<number> {
    const url = `${URL}/apiv1/alquileres/${placa}`;

    return this.http.put<number>(url, { headers: this.header });
  }

  ingresarVehiculo(vehiculo: Vehiculo) {
    const url = `${URL}/apiv1/alquileres/`;
    return this.http.post(url, { vehiculo: vehiculo });
  }
}
