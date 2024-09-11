import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {Subscription} from "rxjs";
import {HotToastService} from "@ngneat/hot-toast";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {User} from "../../shared/models/User";

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.scss']
})
export class UsuarioEditarComponent implements OnInit, AfterViewInit, OnDestroy {

  formGroup: FormGroup;
    loadingSubmit: boolean;

  subscriptions: Subscription[] = [];

  usuario: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toast: HotToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.loadingSubmit = true;

    this.formGroup = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      company: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      latitude: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      const idUser = parseInt(params.get('id')!, 10);
      this.getUserById(idUser);
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {

    this.subscriptions.forEach(s => s.unsubscribe());

  }

  // Getter
  get f(): any{
    return this.formGroup.controls;
  }

  get model(): any{
    return {
      name: this.f.name.value,
      phone: parseInt(this.f.phone.value, 10),
      email: this.f.email.value,
      company: this.f.company.value,
      address: this.f.address.value,
      latitude: parseFloat(this.f.latitude.value),
      longitude: parseFloat(this.f.longitude.value)
    }
  }

  // Events
  evtOnSubmit(): void{
    if(this.formGroup.invalid){
      this.toast.error('Debe llenar todos los campos');
      return;
    }

    this.loadingSubmit = true;
    const sub = this.userService.update(this.model).subscribe((res: boolean)=>{
      this.toast.success('Se actualizo los datos del usuario con exito');
      this.loadingSubmit = false;
      this.router.navigate(['/usuario'])
    }, error => {
      this.toast.error('No se pudo actualizar los datos del usuario');
      this.loadingSubmit = false;
    });
    this.subscriptions.push(sub);

  }

  getUserById(id: number): void{
    const subs = this.userService.find(id).subscribe((res: User) => {
      this.usuario = res;
      this.formGroup.patchValue({
        name: this.usuario.name,
        phone: this.usuario.phone,
        email: this.usuario.email,
        company: this.usuario.company,
        address: this.usuario.address,
        latitude: this.usuario.latitude,
        longitude: this.usuario.longitude,
      });
    }, error => {
      this.toast.error('No se pudo obtener los datos del usuario');
    });
    this.subscriptions.push(subs);
  }


}
