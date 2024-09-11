import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioEditarRoutingModule } from './usuario-editar-routing.module';
import {UsuarioEditarComponent} from "./usuario-editar.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [UsuarioEditarComponent],
  imports: [
    CommonModule,
    UsuarioEditarRoutingModule,
    ReactiveFormsModule
  ],
  exports:[UsuarioEditarComponent],
  providers: [],
  bootstrap: [UsuarioEditarComponent]
})
export class UsuarioEditarModule { }
