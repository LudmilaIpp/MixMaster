import {Component, OnInit} from '@angular/core';
import {ApiCoctelesService} from '../../service/api-cocteles.service';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {ComentarioComponent} from '../comentario/comentario.component';
import {CoctelesBDDService} from '../../service/cocteles-bdd.service';
import {Usuario} from '../../interfaces/usuario';
import {UsuariosBDDService} from '../../service/usuarios-bdd.service';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-coctel-random',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    KeyValuePipe,
    ComentarioComponent,
    FormsModule
  ],
  templateUrl: './coctel-random.component.html',
  styleUrl: './coctel-random.component.css'
})
export class CoctelRandomComponent implements OnInit {
  cocktail: any;
  usuario: Usuario | undefined;
  listasDeUsuario: any[] = [];
  nombreNuevaLista: string = '';
  mostrarModal: boolean = false;

  constructor(
    private cocktailService: ApiCoctelesService,
    private coctelDbService: CoctelesBDDService,
    private usuarioService: UsuariosBDDService// Servicio para la base de datos
  ) { }

  ngOnInit(): void {
    this.getRandomCocktail();

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

  // Obtener un cóctel aleatorio
  getRandomCocktail(): void {
    this.cocktailService.getRandomCocktail().subscribe(data => {
      this.cocktail = data.drinks[0];
      console.log(this.cocktail);
      this.checkAndSaveCocktail(this.cocktail);
    });
  }

  // Comprobar si el cóctel ya existe en la base de datos y guardarlo si no existe
  checkAndSaveCocktail(cocktail: any): void {
    this.coctelDbService.getCoctelPorNombre(cocktail.strDrink).subscribe(existingCocktail => {
      console.log(existingCocktail)
      if (existingCocktail.length != 0) {
        console.log('El cóctel ya existe en la base de datos');
      } else {
        this.coctelDbService.postCoctelesBDD(cocktail).subscribe(response => {
          console.log('Cóctel guardado en la base de datos', response);
        }, error => {
          console.error('Error al guardar el cóctel', error);
        });
      }
    });
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
