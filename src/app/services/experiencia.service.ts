import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Experiencia } from '../models/experiencia';
import { BASE_URL } from '../helpers/env';

const cabecera = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  baseURL = `${BASE_URL}/`;

  constructor(private httpClient: HttpClient) {}

  public lista(): Observable<Experiencia[]> {
    return this.httpClient.get<Experiencia[]>(
      this.baseURL + 'api/experiencia/',
      cabecera
    );
  }

  public detalle(id: number): Observable<Experiencia> {
    return this.httpClient.get<Experiencia>(
      this.baseURL + `api/experiencia/${id}`,
      cabecera
    );
  }

  public crear(experiencia: Experiencia): Observable<any> {
    return this.httpClient.post<any>(
      this.baseURL + 'editor/experiencia',
      experiencia,
      cabecera
    );
  }

  public editar(experiencia: Experiencia, id: number): Observable<any> {
    return this.httpClient.put<any>(
      this.baseURL + `editor/experiencia/${id}`,
      experiencia,
      cabecera
    );
  }

  public borrar(id: number): Observable<any> {
    // console.log("se llamo a borrar en el experiencia service con los siguientes parametros ", this.baseURL + `editor/experiencia/${id}`, cabecera);

    return this.httpClient.delete<any>(
      this.baseURL + `editor/experiencia/${id}`,
      cabecera
    );
  }
}
