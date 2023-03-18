import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtModel } from '../models/jwt-model';
import { LoginUsuario } from '../models/login-usuario';

import { BASE_URL } from '../helpers/env';

const cabecera = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authURL = `${BASE_URL}/api/auth/`;

  constructor(private httpClient: HttpClient) {}

  public login(usuario: LoginUsuario): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(
      this.authURL + 'login',
      usuario,
      cabecera
    );
  }


}
