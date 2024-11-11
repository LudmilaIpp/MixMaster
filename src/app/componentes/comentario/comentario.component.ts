import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ComentariosBDDService} from '../../service/comentarios-bdd.service';
import {Comentario} from '../../interfaces/comentario';

class AuthService {
}

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent implements OnInit{

  @Input() nombreCoctel!: string;
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';

  constructor(private comentariosService: ComentariosBDDService) {}

  ngOnInit() {
    this.obtenerComentarios();
  }

  obtenerComentarios() {
    this.comentariosService.getComentarios(this.nombreCoctel).subscribe((data) => {
      this.comentarios = data;
    });
  }

  agregarComentario() {
    const nombreUsuario = localStorage.getItem('username');

    if (!nombreUsuario) {
      alert('Debes iniciar sesión para comentar.');
      console.log(nombreUsuario);
      return;
    }

    if (this.nuevoComentario.trim() === '') {
      alert('El comentario no puede estar vacío.');
      return;
    }

    const comentario: Comentario = {
      comentario: this.nuevoComentario,
      nombreUsuario,
      nombreCoctel: this.nombreCoctel
    };


    this.comentariosService.agregarComentario(comentario).subscribe(() => {
      this.nuevoComentario = '';
      this.obtenerComentarios();
    });

  }

  protected readonly localStorage = localStorage;

  borrarComentario(comentarioId: string | undefined, comentarioUsuario: string): void {
    const nombreUsuario = localStorage.getItem('username');

    if (nombreUsuario !== comentarioUsuario) {
      alert('No puedes borrar comentarios de otros usuarios.');
      return;
    }

    this.comentariosService.borrarComentario(comentarioId).subscribe(() => {
      this.obtenerComentarios();
    });
  }

}
