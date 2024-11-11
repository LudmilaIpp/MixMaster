import { Component } from '@angular/core';
import {CartaCoctelComponent} from '../../componentes/carta-coctel/carta-coctel.component';

@Component({
  selector: 'app-coctel',
  standalone: true,
  imports: [
    CartaCoctelComponent
  ],
  templateUrl: './coctel.component.html',
  styleUrl: './coctel.component.css'
})
export class CoctelComponent {

}
