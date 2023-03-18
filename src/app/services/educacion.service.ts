import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Educacion } from '../models/educacion';
import { BASE_URL } from '../helpers/env';

const cabecera = {
  headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class EducacionService {
  baseURL = `${BASE_URL}/`;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(
      this.baseURL + 'api/educacion/',
      cabecera
    );
  }

  public detalle(id: number): Observable<Educacion> {
    return this.httpClient.get<Educacion>(
      this.baseURL + `api/educacion/${id}`,
      cabecera
    );
  }

  public crear(educacion: Educacion): Observable<any> {
    return this.httpClient.post<any>(
      this.baseURL + 'editor/educacion',
      educacion,
      cabecera
    );
  }

  public editar(educacion: Educacion, id: number): Observable<any> {
    return this.httpClient.put<any>(
      this.baseURL + `editor/educacion/${id}`,
      educacion,
      cabecera
    );
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      this.baseURL + `editor/educacion/${id}`,
      cabecera
    );
  }
}
