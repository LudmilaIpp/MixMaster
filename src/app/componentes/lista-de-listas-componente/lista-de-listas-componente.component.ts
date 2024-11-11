import {Component, OnInit} from '@angular/core';
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

  usuario: Usuario | undefined;

  constructor(private usuarioService: UsuariosBDDService) {}

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

  // Eliminar un cóctel individual de la lista
  eliminarDeLista(cocktail: Coctel, lista: listaDeLista): void {
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar ${cocktail.strDrink} de la lista ${lista.nombre}?`);
    if (confirmDelete) {
      // Eliminar el cóctel de la lista
      lista.lista = lista.lista.filter(c => c.strDrink !== cocktail.strDrink);

      // Actualizar el usuario en la base de datos
      if (this.usuario) {
        this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
          alert(`${cocktail.strDrink} ha sido eliminado de la lista.`);
        }, (error) => {
          console.error('Error al actualizar el usuario:', error);
          alert('Hubo un problema al eliminar el cóctel de la lista.');
        });
      }
    }
  }

  // Eliminar toda la lista de cócteles
  eliminarTodaLaLista(lista: listaDeLista): void {
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar toda la lista ${lista.nombre}?`);
    if (confirmDelete) {
      // Vaciar la lista
      lista.lista = [];

      // Actualizar el usuario en la base de datos
      if (this.usuario) {
        this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
          alert(`Toda la lista ${lista.nombre} ha sido eliminada.`);
        }, (error) => {
          console.error('Error al actualizar el usuario:', error);
          alert('Hubo un problema al eliminar toda la lista.');
        });
      }
    }
  }

  // Eliminar una lista vacía
  eliminarListaVacia(lista: listaDeLista): void {
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar la lista vacía ${lista.nombre}?`);
    if (confirmDelete) {
      // Eliminar la lista vacía de `usuario.listaDelista`
      if (this.usuario) {
        this.usuario.listaDelista = this.usuario.listaDelista.filter(l => l.nombre !== lista.nombre);

        // Actualizar el usuario en la base de datos
        this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
          alert(`La lista ${lista.nombre} ha sido eliminada.`);
        }, (error) => {
          console.error('Error al actualizar el usuario:', error);
          alert('Hubo un problema al eliminar la lista vacía.');
        });
      }
    }
  }

}
