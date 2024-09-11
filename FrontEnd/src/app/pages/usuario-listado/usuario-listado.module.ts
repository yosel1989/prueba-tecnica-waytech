import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioListadoRoutingModule } from './usuario-listado-routing.module';
import {UsuarioListadoComponent} from "./usuario-listado.component";
import {TblListadoUsuarioModule} from "../../components/tbl-listado-usuario/tbl-listado-usuario.module";


@NgModule({
  declarations: [
    UsuarioListadoComponent
  ],
  imports: [
    CommonModule,
    UsuarioListadoRoutingModule,
    TblListadoUsuarioModule
  ],
  providers:[],
  exports: [UsuarioListadoComponent],
  bootstrap: [UsuarioListadoComponent]
})
export class UsuarioListadoModule { }
