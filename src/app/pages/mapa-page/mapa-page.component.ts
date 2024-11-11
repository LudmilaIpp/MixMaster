import { Component } from '@angular/core';
import {MapaComponent} from '../../componentes/mapa/mapa.component';

@Component({
  selector: 'app-mapa-page',
  standalone: true,
  imports: [
    MapaComponent
  ],
  templateUrl: './mapa-page.component.html',
  styleUrl: './mapa-page.component.css'
})
export class MapaPageComponent {

}
