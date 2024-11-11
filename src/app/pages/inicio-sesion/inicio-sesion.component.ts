import { Component } from '@angular/core';
import {
  InicioSesionComponenteComponent
} from '../../componentes/inicio-sesion-componente/inicio-sesion-componente.component';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [
    InicioSesionComponenteComponent
  ],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {

}
