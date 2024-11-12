import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiCoctelesService {

  urlRandonCoctel = environment.urlCoctelRandom;
  urlCoctelesPorLetra = environment.urlCoctelesPorLetra;

  constructor(private httpClient: HttpClient) { }

  getRandomCocktail(): Observable<any> {
    return this.httpClient.get<any>(this.urlRandonCoctel);
  }

  getCocktailByName(name: string): Observable<any> {
    return this.httpClient.get<any>(`${this.urlCoctelesPorLetra}${name}`);
  }

}
