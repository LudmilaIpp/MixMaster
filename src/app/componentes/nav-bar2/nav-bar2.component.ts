import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-nav-bar2',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar2.component.html',
  styleUrl: './nav-bar2.component.css'
})
export class NavBar2Component {

  router = inject(Router);

  goToRandomCocktail() {
    if (this.router.url === '/coctel-random') {
      window.location.reload();
    } else {
      this.router.navigate(['/coctel-random']);
    }
  }

}
