import {Component, OnInit} from '@angular/core';
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

  cocktail: any;
  cocktailName: string = '';
  usuario: Usuario | undefined; // Usuario logueado
  mostrarModal: boolean = false; // Controlar si la ventana modal está visible
  nombreNuevaLista: string = ''; // Nombre de la nueva lista a crear
  listasDeUsuario: any[] = []; // Listas de listas del usuario

  constructor(
    private route: ActivatedRoute,
    private coctelesService: CoctelesBDDService,
    private usuarioService: UsuariosBDDService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cocktailName = params.get('nombre')!;
      console.log('Cocktail Name in ngOnInit:', this.cocktailName);
      this.getCocktailData(this.cocktailName);

    });

    const username = localStorage.getItem('username');
    if (username) {
      this.usuarioService.getUserByUsername(username).subscribe(user => {
        if (user && user.length > 0) {
          this.usuario = user[0];
          this.listasDeUsuario = this.usuario.listaDelista;
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
        alert('Cóctel agregado a favoritos');
      }, (error) => {
        console.error('Error al actualizar la lista de favoritos:', error);
        alert('Ocurrió un error al agregar el cóctel a favoritos');
      });
    } else {
      alert('Este cóctel ya está en tus favoritos');
    }
  }

  // Mostrar la ventana modal
  abrirModal() {
    this.mostrarModal = true;
  }

  // Cerrar la ventana modal
  cerrarModal() {
    this.mostrarModal = false;
  }

  // Agregar cóctel a una lista existente
  agregarALista(nombreLista: string): void {
    if (!this.usuario) {
      alert('Debes iniciar sesión para agregar a una lista.');
      return;
    }

    let listaExistente = this.usuario.listaDelista.find((lista: any) => lista.nombre === nombreLista);

    if (listaExistente) {
      // Verificar si el cóctel ya está en la lista
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

  // Crear nueva lista y agregar el cóctel
  crearYAgregarALista(): void {
    if (!this.usuario) {
      alert('Debes iniciar sesión para agregar a una lista.');
      return;
    }

    if (!this.nombreNuevaLista) {
      alert('Debes ingresar un nombre para la nueva lista.');
      return;
    }

    // Crear la nueva lista
    const nuevaLista = { nombre: this.nombreNuevaLista, lista: [this.cocktail] };

    // Verificar si ya existe una lista con el mismo nombre
    const listaExistente = this.usuario.listaDelista.find((lista: any) => lista.nombre === this.nombreNuevaLista);
    if (listaExistente) {
      alert('Ya existe una lista con ese nombre.');
      return;
    }

    // Agregar la nueva lista al usuario
    this.usuario.listaDelista.push(nuevaLista);
    this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
      alert('Lista creada y cóctel agregado');
      this.cerrarModal();
    });
  }


}
