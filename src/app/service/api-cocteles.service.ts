import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiCoctelesService {

  urlRandonCoctel = environment.urlCoctelRandom;
  urlCoctelesPorLetra = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

  constructor(private httpClient: HttpClient) { }

  getRandomCocktail(): Observable<any> {
    return this.httpClient.get<any>(this.urlRandonCoctel);
  }

  getCoctelesPorLetra(letra: string): Observable<any>{
    return this.httpClient.get<any>(this.urlCoctelesPorLetra+letra);
  }

  getCocktailByName(name: string): Observable<any> {
    // Realiza la petición GET a la API de TheCocktailDB
    return this.httpClient.get<any>(`${this.urlCoctelesPorLetra}${name}`);
  }

}
