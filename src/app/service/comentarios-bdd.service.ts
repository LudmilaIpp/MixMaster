import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comentario} from '../interfaces/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosBDDService {

  private urlBase = 'http://localhost:3000/comentarios';

  constructor(private httpClient: HttpClient) {}

  getComentarios(nombreCoctel: string): Observable<Comentario[]> {
    return this.httpClient.get<Comentario[]>(`${this.urlBase}?nombreCoctel=${nombreCoctel}`);
  }

  agregarComentario(comentario: Comentario): Observable<Comentario> {
    return this.httpClient.post<Comentario>(this.urlBase, comentario);
  }

  // Eliminar un comentario por ID
  borrarComentario(id: string | undefined): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlBase}/${id}`);
  }


}
