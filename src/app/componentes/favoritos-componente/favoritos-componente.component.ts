import {Component, inject, OnInit} from '@angular/core';
import {Usuario} from '../../interfaces/usuario';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CoctelesBDDService} from '../../service/cocteles-bdd.service';
import {UsuariosBDDService} from '../../service/usuarios-bdd.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-favoritos-componente',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './favoritos-componente.component.html',
  styleUrls: ['./favoritos-componente.component.css']
})
export class FavoritosComponenteComponent implements OnInit {


  route = inject(ActivatedRoute);
  coctelesService = inject(CoctelesBDDService);
  usuarioService = inject(UsuariosBDDService);


  usuario: Usuario | undefined;
  listaDeFavs: any[] = [];
  cocktailName: string | null = null;



  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.usuarioService.getUserByUsername(username).subscribe(user => {
        if (user && user.length > 0) {
          this.usuario = user[0];
          this.listaDeFavs = this.usuario.listaFavoritos || [];
        }
      });
    }else {
      this.usuario = undefined;
    }

    this.route.paramMap.subscribe(params => {
      this.cocktailName = params.get('strDrink');
    });


  }

  eliminarDeFavoritos(cocktail: any): void {
    if (this.usuario && this.usuario.listaFavoritos) {
      const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar ${cocktail.strDrink} de tus favoritos?`);
      if (confirmDelete) {
        this.usuario.listaFavoritos = this.usuario.listaFavoritos.filter(fav => fav.strDrink !== cocktail.strDrink);
        this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
          alert('Cóctel eliminado de favoritos');
          window.location.reload();
        }, (error) => {
          console.error('Error al actualizar el usuario:', error);
          alert('Hubo un problema al eliminar el cóctel de favoritos.');
        });
      }
    } else {
      console.error('Usuario o listaFavoritos no definidos');
    }
  }

  getIngredients(cocktail: any): [string, string][] {
    const ingredients: [string, string][] = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push([ingredient, measure ? measure : '']);
      }
    }

    return ingredients;
  }
}
