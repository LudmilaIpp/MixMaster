import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {MapaComponent} from './pages/mapa/mapa.component';
import {CoctelComponent} from './pages/coctel/coctel.component';
import {InicioSesionComponent} from './pages/inicio-sesion/inicio-sesion.component';
import {RegistrarseComponent} from './pages/registrarse/registrarse.component';
import {PerfilComponent} from './pages/perfil/perfil.component';
import {GuardadosComponent} from './pages/guardados/guardados.component';
import {FavoritosComponent} from './pages/favoritos/favoritos.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent}, //navBar2
  {path: 'mapa', component: MapaComponent}, //navBar1
  {path: 'coctel/:id', component: CoctelComponent},
  {path: 'inicioSesion', component: InicioSesionComponent}, //navBar2
  {path: 'registro',component:RegistrarseComponent},  //navBar2
  {path: 'perfil', component: PerfilComponent}, //navBar2
  {path: 'guardados/:nombre', component:GuardadosComponent}, //navBar2
  {path: 'favoritos', component: FavoritosComponent} //navBar2
];
