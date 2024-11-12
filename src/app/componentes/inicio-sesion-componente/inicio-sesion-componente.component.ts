import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Usuario} from '../../interfaces/usuario';
import {UsuariosBDDService} from '../../service/usuarios-bdd.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-inicio-sesion-componente',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgClass,
    NgIf
  ],
  templateUrl: './inicio-sesion-componente.component.html',
  styleUrl: './inicio-sesion-componente.component.css'
})
export class InicioSesionComponenteComponent {

  router = inject(Router);
  usuarioService = inject(UsuariosBDDService);

  loginModel ={
    username: '',
    password: ''
  };

  onLogin() {
    const usuarioIngresado: Usuario = {
      usuario: this.loginModel.username,
      contrasena: this.loginModel.password,
      listaFavoritos: [],
      listaDelista: []
    };

    this.traerUsuarioDeBDD(usuarioIngresado);
  }

  traerUsuarioDeBDD(usuarioIngresado : Usuario) {
    this.usuarioService.getUserByUsername(usuarioIngresado.usuario.toString()).subscribe({
      next: (usuario: Usuario[]) => {

        console.log(usuario)

        if (usuario.find(usuario => usuario.contrasena.toString() === usuarioIngresado.contrasena.toString()
          && usuario.usuario.toString() === usuarioIngresado.usuario.toString())) {

          localStorage.setItem('username', usuarioIngresado.usuario);
          alert('Inicio de sesión exitoso');

          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });

        } else {
          alert('Nombre de usuario o contraseña incorrectos');
        }
      },
      error(err: any): void {
        console.error(err);
      }
    });
  }

}
