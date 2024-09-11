import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsuarioListadoComponent} from "./usuario-listado.component";

const routes: Routes = [{
  path: '',
  component: UsuarioListadoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioListadoRoutingModule { }
