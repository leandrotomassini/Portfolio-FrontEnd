import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilUsuario } from '../models/PerfilUsuario';
import { BASE_URL } from '../helpers/env';
const cabecera = {
  headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PerfilUsuarioService {
  baseURL = `${BASE_URL}/`;

  constructor(private httpClient: HttpClient) {}

  public lista(): Observable<PerfilUsuario[]> {
    return this.httpClient.get<PerfilUsuario[]>(
      this.baseURL + 'api/perfilusuario/',
      cabecera
    );
  }

  public detalle(id: number): Observable<PerfilUsuario> {
    return this.httpClient.get<PerfilUsuario>(
      this.baseURL + `api/perfilusuario/${id}`,
      cabecera
    );
  }

  public crear(perfilUsuario: PerfilUsuario): Observable<any> {
    return this.httpClient.post<any>(
      this.baseURL + 'editor/perfilusuario',
      perfilUsuario,
      cabecera
    );
  }

  public editar(perfilUsuario: PerfilUsuario, id: number): Observable<any> {
    return this.httpClient.put<any>(
      this.baseURL + `editor/perfilusuario/${id}`,
      perfilUsuario,
      cabecera
    );
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      this.baseURL + `editor/perfilUsuario/${id}`,
      cabecera
    );
  }
}
