import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {Usuario} from '../interfaces/usuario';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuariosBDDService {

  constructor(private httpClient: HttpClient) { }

  urlUsuariosBDD = environment.urlUsuariosBDD;

  getTodosLosUsuariosBDD(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.urlUsuariosBDD);
  }

  postUser(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.urlUsuariosBDD, usuario);
  }

  getUserByUsername(usuario: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.urlUsuariosBDD}?usuario=${usuario}`);
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.urlUsuariosBDD}/${usuario.id}`, usuario);
  }

}
