import {Component, inject, OnInit} from '@angular/core';
import {UsuariosBDDService} from '../../service/usuarios-bdd.service';
import {Usuario} from '../../interfaces/usuario';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {listaDeLista} from '../../interfaces/listaDeLista';
import {Coctel} from '../../interfaces/coctel';

@Component({
  selector: 'app-lista-de-listas-componente',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './lista-de-listas-componente.component.html',
  styleUrl: './lista-de-listas-componente.component.css'
})
export class ListaDeListasComponenteComponent implements OnInit {

  usuarioService = inject(UsuariosBDDService);

  usuario: Usuario | undefined;

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.usuarioService.getUserByUsername(username).subscribe(user => {
        if (user && user.length > 0) {
          this.usuario = user[0];
        }
      });
    }
  }

  eliminarDeLista(cocktail: Coctel, lista: listaDeLista): void {

    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar ${cocktail.strDrink} de la lista ${lista.nombre}?`);

    if (confirmDelete) {

      lista.lista = lista.lista.filter(c => c.strDrink !== cocktail.strDrink);

      if (this.usuario) {

        this.usuarioService.updateUsuario(this.usuario).subscribe(() => {

        }, (error) => {

          console.error('Error al actualizar el usuario:', error);
          alert('Hubo un problema al eliminar el cóctel de la lista.');

        });
      }
    }
  }

  eliminarTodaLaLista(lista: listaDeLista): void {

    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar toda la lista ${lista.nombre}?`);

    if (confirmDelete) {

      lista.lista = [];

      if (this.usuario) {

        this.usuarioService.updateUsuario(this.usuario).subscribe(() => {


        }, (error) => {

          console.error('Error al actualizar el usuario:', error);
          alert('Hubo un problema al eliminar toda la lista.');

        });
      }
    }
  }

  eliminarListaVacia(lista: listaDeLista): void {

    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar la lista vacía ${lista.nombre}?`);

    if (confirmDelete) {

      if (this.usuario) {

        this.usuario.listaDelista = this.usuario.listaDelista.filter(l => l.nombre !== lista.nombre);

        this.usuarioService.updateUsuario(this.usuario).subscribe(() => {

        }, (error) => {

          console.error('Error al actualizar el usuario:', error);
          alert('Hubo un problema al eliminar la lista vacía.');

        });
      }
    }
  }

}
