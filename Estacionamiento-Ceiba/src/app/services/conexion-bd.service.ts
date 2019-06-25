import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
    const url = `${URL}/alquiler/listar/`;
    return this.http.get<any>(url, { headers: this.header });
  }

  obtenerAlquiler(placa: String): Observable<any> {
    const url = `${URL}/alquiler/busqueda/${placa}`;
    return this.http.get<any>(url, { headers: this.header });
  }
}
