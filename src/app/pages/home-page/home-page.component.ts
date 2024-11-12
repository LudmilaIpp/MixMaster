import { Component } from '@angular/core';
import {HomeComponentComponent} from '../../componentes/home-component/home-component.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeComponentComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
