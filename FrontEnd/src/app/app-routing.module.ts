import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario-listado/usuario-listado.module').then(m => m.UsuarioListadoModule)
  },
  {
    path: 'usuario/nuevo',
    loadChildren: () => import('./pages/usuario-nuevo/usuario-nuevo.module').then(m => m.UsuarioNuevoModule)
  },
  {
    path: 'usuario/editar/:id',
    loadChildren: () => import('./pages/usuario-editar/usuario-editar.module').then(m => m.UsuarioEditarModule)
  },
  {
    path: '**',
    redirectTo: 'usuario'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
