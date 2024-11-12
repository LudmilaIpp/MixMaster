import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CoctelesBDDService} from '../../service/cocteles-bdd.service';
import {NgForOf, NgIf} from '@angular/common';
import {ComentarioComponent} from '../comentario/comentario.component';
import {UsuariosBDDService} from '../../service/usuarios-bdd.service';
import {Usuario} from '../../interfaces/usuario';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-carta-coctel',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    ComentarioComponent,
    FormsModule
  ],
  templateUrl: './carta-coctel.component.html',
  styleUrl: './carta-coctel.component.css'
})
export class CartaCoctelComponent  implements OnInit {

  route = inject(ActivatedRoute);
  coctelesService = inject(CoctelesBDDService);
  usuarioService = inject(UsuariosBDDService);
  elementRef = inject(ElementRef);


  cocktail: any;
  cocktailName: string = '';
  usuario: Usuario | undefined; // Usuario logueado
  mostrarModal: boolean = false; // Controlar si la ventana modal está visible
  nombreNuevaLista: string = ''; // Nombre de la nueva lista a crear
  listasDeUsuario: any[] = []; // Listas de listas del usuario
  fav: String = 'AGREGAR A FAVORITOS';


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cocktailName = params.get('nombre')!;
      this.getCocktailData(this.cocktailName);

    });

    const username = localStorage.getItem('username');
    if (username) {
      this.usuarioService.getUserByUsername(username).subscribe(user => {
        if (user && user.length > 0) {
          this.usuario = user[0];
          this.listasDeUsuario = this.usuario.listaDelista;
          if (this.usuario.listaFavoritos.some((item: any) => item.strDrink === this.cocktail.strDrink))
          {
            this.fav = 'QUITAR DE FAVORITOS';
            const boton = this.elementRef.nativeElement.querySelector('button');
            boton.style.backgroundColor = 'red';
          }
        }
      });
    }


  }


  getCocktailData(cocktailName: string) {
    this.coctelesService.getCoctelPorNombre(cocktailName).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.cocktail = data[0];
        } else {
          console.log('No se encontraron cócteles con ese nombre.');
        }
      },
      (error) => {
        console.error('Error al obtener el cóctel:', error);
      }
    );
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

  agregarAFavoritos(): void {
    if (!this.usuario) {
      alert('Debes iniciar sesión para agregar a favoritos.');
      return;
    }
    if (!this.usuario.listaFavoritos.some((item: any) => item.strDrink === this.cocktail.strDrink)) {
      this.usuario.listaFavoritos.push(this.cocktail);
      this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
        this.fav = 'QUITAR DE FAVORITOS';
       const boton = this.elementRef.nativeElement.querySelector('button');
       boton.style.backgroundColor = 'red';
      }, (error) => {
        console.error('Error al actualizar la lista de favoritos:', error);
        alert('Ocurrió un error al agregar el cóctel a favoritos');
      });
    } else {
      this.usuario.listaFavoritos = this.usuario.listaFavoritos.filter(favorito => favorito.strDrink !== this.cocktail.strDrink);
      this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
        this.fav = 'AGREGAR A FAVORITOS';
        const boton = this.elementRef.nativeElement.querySelector('button');
        boton.style.backgroundColor = '#d43c65';
      }, (error) => {
        console.error('Error al actualizar el usuario:', error);
        alert('Hubo un problema al eliminar el cóctel de favoritos.');
      });
    }
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }


  agregarALista(nombreLista: string): void {
    if (!this.usuario) {
      alert('Debes iniciar sesión para agregar a una lista.');
      return;
    }

    let listaExistente = this.usuario.listaDelista.find((lista: any) => lista.nombre === nombreLista);

    if (listaExistente) {
      if (!listaExistente.lista.some((item: any) => item.strDrink === this.cocktail.strDrink)) {
        listaExistente.lista.push(this.cocktail);
        this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
          alert('Cóctel agregado a la lista');
          this.cerrarModal();
        });
      } else {
        alert('Este cóctel ya está en la lista');
      }
    }
  }

  crearYAgregarALista(): void {
    if (!this.usuario) {
      alert('Debes iniciar sesión para agregar a una lista.');
      return;
    }

    if (!this.nombreNuevaLista) {
      alert('Debes ingresar un nombre para la nueva lista.');
      return;
    }

    const nuevaLista = { nombre: this.nombreNuevaLista, lista: [this.cocktail] };

    const listaExistente = this.usuario.listaDelista.find((lista: any) => lista.nombre === this.nombreNuevaLista);
    if (listaExistente) {
      alert('Ya existe una lista con ese nombre.');
      return;
    }

    this.usuario.listaDelista.push(nuevaLista);
    this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
      alert('Lista creada y cóctel agregado');
      this.cerrarModal();
    });
  }


}
