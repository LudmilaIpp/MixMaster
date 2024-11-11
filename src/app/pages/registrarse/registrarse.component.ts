import { Component } from '@angular/core';
import {RegistroComponenteComponent} from '../../componentes/registro-componente/registro-componente.component';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [
    RegistroComponenteComponent
  ],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {

}
