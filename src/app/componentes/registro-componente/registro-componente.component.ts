import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosBDDService } from '../../service/usuarios-bdd.service';

@Component({
  selector: 'app-registro-componente',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgClass,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './registro-componente.component.html',
  styleUrls: ['./registro-componente.component.css']
})
export class RegistroComponenteComponent {

  constructor(private router: Router) {}

  fb = inject(FormBuilder);
  usuarioService = inject(UsuariosBDDService)
  todosLosUsuarios: Usuario[] = [];

  formulario = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
  }, { validator: this.passwordMatchValidator });

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  sacarDelFormulario() {
    if (this.formulario.invalid) {
      return;
    }

    const usuarioNuevo: Usuario = {
      usuario: this.formulario.value.username!,
      contrasena: this.formulario.value.password!,
      listaFavoritos: [],
      listaDelista: []
    };

    this.verificarUsuarioExistente(usuarioNuevo);
  }

  verificarUsuarioExistente(usuarioNuevo: Usuario) {
    this.usuarioService.getUserByUsername(usuarioNuevo.usuario).subscribe({
      next: (usuarios: Usuario[]) => {
        if (usuarios.length === 0) {
          this.agregarUsuarioBDD(usuarioNuevo);
          this.formulario.reset();
        } else {
          alert('El usuario ya existe');
        }
      },
      error: (err: any) => {
        console.error('Error al verificar usuario:', err);
      }
    });
  }

  agregarUsuarioBDD(usuario: Usuario) {
    this.usuarioService.postUser(usuario).subscribe({
      next: () => {
        alert('Usuario creado. Serás redirigido a iniciar sesión');
        this.router.navigate(['./inicioSesion']);
      },
      error: (e) => {
        console.error('Error al crear el usuario:', e);
      }
    });
  }
}
