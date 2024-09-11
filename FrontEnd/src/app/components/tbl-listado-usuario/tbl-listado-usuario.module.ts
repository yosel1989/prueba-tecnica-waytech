import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRippleModule} from "@angular/material/core";
import {TblListadoUsuarioComponent} from "./tbl-listado-usuario.component";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    TblListadoUsuarioComponent
  ],
  imports: [
    CommonModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressBarModule,
    NgbTooltipModule,
    MatRippleModule
  ],
  exports: [TblListadoUsuarioComponent],
  providers: [],
  bootstrap: [TblListadoUsuarioComponent]
})
export class TblListadoUsuarioModule { }
