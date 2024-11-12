import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comentario} from '../interfaces/comentario';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ComentariosBDDService {

  urlComentariosBDD = environment.urlComentariosBDD;

  constructor(private httpClient: HttpClient) {}

  getComentarios(nombreCoctel: string): Observable<Comentario[]> {
    return this.httpClient.get<Comentario[]>(`${this.urlComentariosBDD}?nombreCoctel=${nombreCoctel}`);
  }

  agregarComentario(comentario: Comentario): Observable<Comentario> {
    return this.httpClient.post<Comentario>(this.urlComentariosBDD, comentario);
  }

  // Eliminar un comentario por ID
  borrarComentario(id: string | undefined): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlComentariosBDD}/${id}`);
  }


}
