import { Component } from '@angular/core';
import {ListaCoctelesComponent} from '../../componentes/lista-cocteles/lista-cocteles.component';

@Component({
  selector: 'app-cocteles',
  standalone: true,
  imports: [
    ListaCoctelesComponent
  ],
  templateUrl: './cocteles.component.html',
  styleUrl: './cocteles.component.css'
})
export class CoctelesComponent {

}
