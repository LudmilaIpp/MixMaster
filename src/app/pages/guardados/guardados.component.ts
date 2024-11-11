import { Component } from '@angular/core';
import {
  ListaDeListasComponenteComponent
} from '../../componentes/lista-de-listas-componente/lista-de-listas-componente.component';

@Component({
  selector: 'app-guardados',
  standalone: true,
  imports: [
    ListaDeListasComponenteComponent
  ],
  templateUrl: './guardados.component.html',
  styleUrl: './guardados.component.css'
})
export class GuardadosComponent {

}
