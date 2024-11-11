import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {Usuario} from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosBDDService {

  constructor(private httpClient: HttpClient) { }

  urlBase: string = 'http://localhost:3000/usuarios' ;

  getTodosLosUsuariosBDD(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.urlBase);
  }

  postUser(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.urlBase, usuario);
  }

  getUserByUsername(usuario: string): Observable<Usuario[]> {
    console.log("Realizando consulta para usuario:", usuario);
    return this.httpClient.get<Usuario[]>(`${this.urlBase}?usuario=${usuario}`);
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    console.log("Realizando consulta para usuario:", usuario.usuario);
    return this.httpClient.put<Usuario>(`${this.urlBase}/${usuario.id}`, usuario);
  }

}
