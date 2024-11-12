import {Component, inject, OnInit} from '@angular/core';
import {ApiCoctelesService} from '../../service/api-cocteles.service';
import {NgForOf, NgIf} from '@angular/common';
import {Coctel} from '../../interfaces/coctel';
import {CoctelesBDDService} from '../../service/cocteles-bdd.service';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-lista-cocteles',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './lista-cocteles.component.html',
  styleUrl: './lista-cocteles.component.css'
})
export class ListaCoctelesComponent implements OnInit {


  coctelesBDD = inject(CoctelesBDDService);
  cocktailService = inject(ApiCoctelesService);

  Listacocktail: any[] = [];
  filteredCocktails: any[] = [];
  filterName: string = '';
  filterIngredient: string = '';
  filterAlcohol: string = '';

  ngOnInit(): void {
    this.getCoctelesBDD();
  }

  getCoctelesBDD(): void {
    this.coctelesBDD.getTodosLosCoctelesBDD().subscribe({
      next: (data) => {
        this.Listacocktail = data;
        this.filteredCocktails = data;
      },
      error: (error) => {
        console.error('Error al obtener los cócteles:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredCocktails = this.Listacocktail.filter(cocktail => {
      const matchesName = this.filterName ? cocktail.strDrink.toLowerCase().includes(this.filterName.toLowerCase()) : true;

      const matchesIngredient = this.filterIngredient ? this.getIngredients(cocktail).some(i => i[1].toLowerCase().includes(this.filterIngredient.toLowerCase())) : true;

      const matchesAlcohol = this.filterAlcohol ? this.getIngredients(cocktail).some(i => i[1].toLowerCase().includes(this.filterAlcohol.toLowerCase())) : true;

      return matchesName && matchesIngredient && matchesAlcohol;
    });
  }

  filterByAlcohol(alcohol: string): void {
    this.filterAlcohol = alcohol;
    this.applyFilters();
  }

  getIngredients(cocktail: any): any[] {
    return Object.entries(cocktail).filter(([key, value]) => key.startsWith('strIngredient') && value);
  }

  resetFilters(): void {
    this.filterName = '';
    this.filterIngredient = '';
    this.filterAlcohol = '';
    this.filteredCocktails = this.Listacocktail;
  }


  /*
  letras=['a','e','i','o','u'];
  getCoctelesPorLetraDesdeAPI(): void {
      this.cocktailService.getCoctelesPorLetra(this.letras[0]).subscribe({
        next: (data) => {
          this.Listacocktail = data.drinks;
          this.modificarIDCocteles();
          console.log(this.Listacocktail);
          this.guardarCoctelesJSON();
        },
        error: (error) => {
          console.error('Error al obtener los cócteles:', error);
        }
      });
  }

  guardarCoctelesJSON() {
    this.Listacocktail.slice(0, 50).forEach((coc: Coctel) => {
      this.coctelesBDD.postCoctelesBDD(coc).subscribe({
        next: () => {
          console.log('coctel guardado');
        }, error: (e) => {
          console.error(e);
        }
      });
    })
  }

   modificarIDCocteles()
  {
    this.Listacocktail.forEach((coctel, index) => {
      coctel.id = index + 1; // Asigna un ID incremental
    });
  }
  */




}
