import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioListadoTablaComponent } from './usuario-listado-tabla.component';

describe('UsuarioListadoTablaComponent', () => {
  let component: UsuarioListadoTablaComponent;
  let fixture: ComponentFixture<UsuarioListadoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioListadoTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioListadoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
