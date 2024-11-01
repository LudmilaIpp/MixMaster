import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav-bar1',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './nav-bar1.component.html',
  styleUrl: './nav-bar1.component.css'
})
export class NavBar1Component {

}
