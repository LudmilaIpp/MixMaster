import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgIf} from '@angular/common';
import {UsuariosBDDService} from '../../service/usuarios-bdd.service';

@Component({
  selector: 'app-nav-bar1',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './nav-bar1.component.html',
  styleUrl: './nav-bar1.component.css'
})
export class NavBar1Component implements OnInit {

  constructor(private router: Router) {}

  username: string | null = null;
  hola: string='';


  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('username');
    this.username = null;// Limpiar el nombre de usuario
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }




}
