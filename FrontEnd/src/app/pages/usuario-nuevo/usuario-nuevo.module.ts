import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsuarioNuevoComponent} from "./usuario-nuevo.component";
import {UsuarioNuevoRoutingModule} from "./usuario-nuevo-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [UsuarioNuevoComponent],
  imports: [
    UsuarioNuevoRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [UsuarioNuevoComponent],
  providers: [],
  bootstrap: [UsuarioNuevoComponent]
})
export class UsuarioNuevoModule { }
