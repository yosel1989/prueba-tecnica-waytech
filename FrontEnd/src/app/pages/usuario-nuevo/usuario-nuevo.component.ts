import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {Subscription} from "rxjs";
import {HotToastService} from "@ngneat/hot-toast";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.scss']
})
export class UsuarioNuevoComponent implements OnInit, AfterViewInit, OnDestroy {

  formGroup: FormGroup;

  loadingSubmit: boolean;

  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toast: HotToastService,
    private router: Router
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
      const sub = this.userService.create(this.model).subscribe((res: boolean)=>{
        this.toast.success('Se registro el usuario con exito');
        this.loadingSubmit = false;
        this.router.navigate(['/usuario'])
      }, error => {
        this.toast.error('No se pudo registrar el usuario');
        this.loadingSubmit = false;
      });
      this.subscriptions.push(sub);

  }


}
