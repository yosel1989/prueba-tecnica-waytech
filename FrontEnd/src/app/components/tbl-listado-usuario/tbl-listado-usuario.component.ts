import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {animate, style, transition, trigger} from '@angular/animations';
import {BehaviorSubject, Subscription} from "rxjs";
import { NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SelectionModel} from "@angular/cdk/collections";
import {User} from "../../shared/models/User";
import {ColumnaFiltro} from "../../shared/models/Tabla";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";


@Component({
  selector: 'app-tbl-listado-usuario',
  templateUrl: './tbl-listado-usuario.component.html',
  styleUrls: ['./tbl-listado-usuario.component.scss'],
  animations: [
    trigger('slideFromBottom', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms {{delay}}ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
      ], { params: { delay: 10 } })
    ])
  ]
})
export class TblListadoUsuarioComponent implements OnInit, AfterViewInit, OnDestroy {

  _loading = new  BehaviorSubject<boolean>(false);
  _collection = new BehaviorSubject<User[]>([]);

  displayedColumns: string[];
  dataSource : MatTableDataSource<User>;
  selection: SelectionModel<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading: boolean;

  // subscriptions
  modalRef: NgbModalRef | undefined;
  subscriptions: Subscription[] = [];

  columnas: ColumnaFiltro[] = [
    {key:'select',canFilter: false, canShow: true, filter:false, nombre:'', selected: false, export: false, show: true, type: 'any'},
    // {key:'activo',canFilter: false, canShow: true, filter:false, nombre:'Activo', selected: false, export: true, show: true, type: 'any'},
    {key:'name',canFilter: true, canShow: true, filter:true, nombre:'Nombre', selected: false, export: true, show: true, type: 'Date'},
    {key:'phone',canFilter: true, canShow: true, filter:true, nombre:'Telefono', selected: false, export: true, show: true, type: 'string'},
    {key:'email',canFilter: true, canShow: true, filter:true, nombre:'Email', selected: false, export: true, show: true, type: 'int'},
    {key:'company',canFilter: true, canShow: true, filter:true, nombre:'Compañia', selected: false, export: true, show: true, type: 'float'},
    {key:'address',canFilter: true, canShow: true, filter:true, nombre:'Dirección', selected: false, export: true, show: true, type: 'float'},
    {key:'latitude',canFilter: true, canShow: true, filter:true, nombre:'Latitud', selected: false, export: true, show: true, type: 'string'},
    {key:'longitude',canFilter: true, canShow: true, filter:true, nombre:'Longitud', selected: false, export: true, show: true, type: 'DateTime'},
  ];


  columnasFiltar: ColumnaFiltro[] = [];
  searchFocus: boolean = false;
  filtrarTodos: boolean = false;


  constructor(
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    private api: UserService,
    private router: Router,
    private toast: HotToastService,
  ) {
    this.loading = false;
    this.displayedColumns = this.columnas.map(x => x.key!);
    this.dataSource = new MatTableDataSource<User>([]);
    this.selection = new SelectionModel<User>(false, []);
  }

  ngOnInit(): void {
    this.columnasFiltar = this.columnas.filter(x => x.canFilter && x.filter && x.canShow && x.show);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.collection();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.modalRef?.close();
  }


  /**********************************************************************************************************
   * Getters
   */
  get showEdit(): boolean{
    return this.selection.hasValue() && this.selection.selected.length === 1;
  }

  get count(): number{
    return this.dataSource.data.length;
  }

  get getDisplayedColumns(): string[]{
    return this.columnas.filter(c => c.show).map(x => x.key!);
  }

  get getCountColumnasFiltrar(): number{
    return this.columnasFiltar.filter(x => x.show && x.filter).length;
  }

  get getCountColumnasShow(): number{
    return this.columnasFiltar.filter(x => x.show).length;
  }

  /**************************************************************************************************************
   * Obtener lista de caja del cliente
   * @private
   *
   */
  private collection(): void{

    this.loading = true;
    this._loading.next(true);

    const sub = this.api.collection().subscribe((res: User[]) => {
      this.dataSource.data = res;
      this._collection.next(res);

      this.loading = false;
      this._loading.next(false);
    }, (error: any) => {
      this.loading = false;
      this._loading.next(false);
    });
    this.subscriptions.push(sub);
  }

  // Events
  evtOnReload(): void{
    this.collection();
    this.selection.clear();
  }

  evtInput(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchFocus = true;
  }

  evtOutput(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchFocus = !!filterValue;
  }

  evtApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.columnas.filter(x => x.filter && x.show).length){
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  evtToggleFilter(key: string, event: Event): void{
    const filterValue = (event.target as HTMLInputElement).checked;
    const column = this.columnasFiltar.find(x => x.key === key);
    if(column){
      column.selected = filterValue;
    }
    this.filtrarTodos = this.columnasFiltar.length === this.columnasFiltar.filter(x => x.selected).length;

    this.dataSource._updateChangeSubscription();
  }

  evtToggleAllFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).checked;
    this.filtrarTodos = filterValue;
    this.columnasFiltar.forEach(x =>{
      x.selected = filterValue;
    });
    this.dataSource._updateChangeSubscription();
  }


  evtOnAdd(): void{
    this.router.navigate(['/usuario/nuevo'])
  }

  evtOnUpdate(): void{
    const data = this.selection.selected[0]!;
    this.router.navigate([`/usuario/editar/${data.id}`])
  }

  evtOnDelete(): void{
    const data = this.selection.selected[0]!;
    const sub = this.api.delete(data.id).subscribe((res: boolean) => {
      this.toast.success('El usuario se elimino con exito');
      this.evtOnReload();
    }, error => {
      this.toast.error('No se pudo eliminar el usuario seleccionado');
    });
    this.subscriptions.push(sub);
  }

}
