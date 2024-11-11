import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar1Component } from './componentes/nav-bar1/nav-bar1.component';
import { NavBar2Component } from './componentes/nav-bar2/nav-bar2.component';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBar1Component, NavBar2Component],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}

bootstrapApplication(AppComponent, {
  providers: []
});
