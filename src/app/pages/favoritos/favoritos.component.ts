import { Component } from '@angular/core';
import {FavoritosComponenteComponent} from '../../componentes/favoritos-componente/favoritos-componente.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [
    FavoritosComponenteComponent
  ],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {

}
