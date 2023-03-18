import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyectos } from '../models/proyectos';
import { BASE_URL } from '../helpers/env';

const cabecera = {
  headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  baseURL = `${BASE_URL}/`;

  constructor(private httpClient: HttpClient) {}

  public lista(): Observable<Proyectos[]> {
    return this.httpClient.get<Proyectos[]>(
      this.baseURL + 'api/proyectos/',
      cabecera
    );
  }

  public detalle(id: number): Observable<Proyectos> {
    return this.httpClient.get<Proyectos>(
      this.baseURL + `api/proyectos/${id}`,
      cabecera
    );
  }

  public crear(proyectos: Proyectos): Observable<any> {
    return this.httpClient.post<any>(
      this.baseURL + 'editor/proyectos',
      proyectos,
      cabecera
    );
  }

  public editar(proyectos: Proyectos, id: number): Observable<any> {
    return this.httpClient.put<any>(
      this.baseURL + `editor/proyectos/${id}`,
      proyectos,
      cabecera
    );
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      this.baseURL + `editor/proyectos/${id}`,
      cabecera
    );
  }
}
