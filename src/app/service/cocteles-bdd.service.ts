import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Coctel} from '../interfaces/coctel';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoctelesBDDService {

  constructor(private httpClient: HttpClient) { }

  urlBase: string = 'http://localhost:3000/cocteles';


  getTodosLosCoctelesBDD(): Observable<Coctel[]>{
    return this.httpClient.get<Coctel[]>(this.urlBase)
  }

  postCoctelesBDD(coctel: Coctel): Observable<Coctel> {
    return this.httpClient.post<Coctel>(this.urlBase, coctel);
  }

  getCoctelPorNombre(nombre: string): Observable<any> {
    const url = `${this.urlBase}?strDrink=${nombre}`;
    return this.httpClient.get<any>(url);
  }

}
