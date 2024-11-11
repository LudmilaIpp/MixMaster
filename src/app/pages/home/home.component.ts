import {Component, OnInit} from '@angular/core';
import {ApiCoctelesService} from '../../service/api-cocteles.service';
import {NgForOf, NgIf} from '@angular/common';
import {ListaCoctelesComponent} from '../../componentes/lista-cocteles/lista-cocteles.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ListaCoctelesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
