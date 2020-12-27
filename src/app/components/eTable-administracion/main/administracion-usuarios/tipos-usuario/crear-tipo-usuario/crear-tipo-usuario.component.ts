import { Component, OnInit } from '@angular/core';
import { Path } from 'src/app/infrastructure/constans/Path';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/domain/TipoUsuario';
import { MenuItem, MenuSubItem } from 'src/app/domain/MainMenu';
import { MainMenuService } from 'src/app/services/administracion/sistema/main-menu.service';
import { PermisosService } from 'src/app/services/administracion/administracion-usuarios/permisos.service';
import { Permiso } from 'src/app/domain/Permiso';
import { TipoUsuarioService } from 'src/app/services/administracion/administracion-usuarios/tipo-usuario.service';
import { TipoUsuarioPermiso } from 'src/app/domain/TipoUsuarioPermiso';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-crear-tipo-usuario',
  templateUrl: './crear-tipo-usuario.component.html',
  styleUrls: ['./crear-tipo-usuario.component.css']
})
export class CrearTipoUsuarioComponent implements OnInit {

  public tipousuario: TipoUsuario;
  public items: MenuItem[];
  public subitems: MenuSubItem[];
  public permisos: any[];
  public permisosAsignados: Permiso[];
  public selectedItemId: number;
  public listTipoUsuarioPermiso: TipoUsuarioPermiso[];
  public id: number;
  public onEdit: boolean;
  public empty: boolean;
  public load: boolean;
  public loading: string;
  public permisosLoad: boolean;
  public moduloSelected: boolean;
  public emptyText: string;
  public listDelete: TipoUsuarioPermiso[];
  public listAdd: TipoUsuarioPermiso[];
  public allPermisos: boolean;

  constructor(
    private router: Router,
    private serviceUsuario: TipoUsuarioService,
    private servicePermiso: PermisosService,
    private serviceMainMenu: MainMenuService) {
    this.load = true;
    this.loading = Path.loading;
    this.selectedItemId = 0;
    this.tipousuario = new TipoUsuario();
    this.permisosAsignados = [];
    this.permisos = [];
    this.subitems = [];
    this.empty = false;
    this.listDelete = [];
    this.listAdd = [];
    this.allPermisos = false;
  }

  ngOnInit() {
    if (this.isEdit()) {
      this.allPermisos = true;
      this.onEdit = true;
      this.serviceUsuario.getTipoUsuarioById(this.id)
        .subscribe(data => {
          if (data !== null) {
            this.tipousuario = data;
            this.getModuloMenuItems();
            this.getPermisosAsignadosDeTipoUsuario();
          }
        });
    } else { this.getModuloMenuItems(); }
  }

  private isEdit() {
    this.id = +(localStorage.getItem('tipousuarioId'));
    if (this.id === 0) { return false;
    } else { return true; }
  }

  private getModuloMenuItems() {
    this.serviceMainMenu.getListMenuItems().subscribe(data => {
      this.load = false;
      if (data.length !== 0) { this.items = data; }
    });
  }

  public getModuloMenuSubItems() {
    if (this.selectedItemId === 0) {
      this.permisosLoad = false; this.moduloSelected = false;
    } else {
      this.permisosLoad = false; this.moduloSelected = true; this.load = true;
      this.getModuloMenuSubItemsByItem(this.selectedItemId);
    }
  }

  private getModuloMenuSubItemsByItem(id: number) {
    this.serviceMainMenu.getListMenuSubItemsByItem(id).subscribe(data => {
      if (data.length !== 0) {
        this.subitems = data;
        this.getPermisosBySubItems(this.subitems);
      }
    });
  }

  private getPermisosBySubItems(subitems: MenuSubItem[]) {
    this.servicePermiso.getPermisosBySubItemForkJoin(subitems).subscribe(data => {
      this.load = false;
      if (data.length !== 0) {
        this.permisosLoad = true;
        data.forEach(val => { val.forEach(v => { v.selected = false; v.action = false; }); });
        this.permisos = data;
        this.setPermisosSelected();
      }
    });
  }

  private setPermisosSelected() {
    this.permisos.forEach(val => {
      val.forEach(v => {
        this.permisosAsignados.forEach(p => {
          if (p.cpermiso === v.cpermiso) { v.selected = true; }
        });
      });
    });
  }

  public crear() {
    if (!this.estaVacio()) {
      this.load = true;
      this.serviceUsuario.crearTipoUsuario(this.tipousuario).subscribe(data => {
        if (data !== null) {
          this.tipousuario = data;
          this.asignarPermisos();
        } else {
          this.load = false;
          this.empty = true;
          this.emptyText = 'Nombre de Tipo de usuario ya existe';
        }
      });
    }
  }

  actualizar() {
    this.actualizarTipoUsuario();
  }

  actualizarTipoUsuario() {
    if (this.listDelete.length > 0 && this.listAdd.length > 0) {
      this.actualizarListPermisos().subscribe(o => {
        if (o) {
          this.navigateList();
        }
      });
    } else if (this.listDelete.length > 0) {
      this.serviceUsuario.removerPermisos(this.listDelete).subscribe(data => {
        if (data) {
          this.navigateList();
        }
      });
    } else if (this.listAdd.length > 0) {
      this.serviceUsuario.asignarPermisos(this.listAdd).subscribe(data => {
        if (data) {
          this.navigateList();
        }
      });
    } else {
      this.navigateList();
    }
  }

  actualizarListPermisos(): Observable<any> {
    const obs = [];
    obs.push(this.serviceUsuario.asignarPermisos(this.listAdd),
    this.serviceUsuario.removerPermisos(this.listDelete));
    return forkJoin(obs);
  }

  private estaVacio() {
    if (this.tipousuario.tiponombre === undefined || this.tipousuario.tiponombre.trim().length === 0) {
      this.empty = true;
      this.emptyText = 'Ingrese nombre del tipo de usuario';
      return true;
    }
    if (this.tipousuario.tipodescripcion === undefined || this.tipousuario.tipodescripcion.trim().length === 0) {
      this.empty = true;
      this.emptyText = 'Ingrese descripción del tipo de usuario';
      return true;
    }
    if (this.permisosAsignados.length === 0) {
      this.empty = true;
      this.emptyText = 'Asigne permisos al tipo de usuario';
      return true;
    }
  }

  public agregarPermiso(id: number, permiso: Permiso) {
    const index: number = this.permisos[id].indexOf(permiso);
    this.permisos[id].splice(index, 1);
    this.permisosAsignados.push(permiso);
    if (this.onEdit) {
      this.agregarPermisoOnEdit(permiso);
    }
  }

  private agregarPermisoOnEdit(permiso: Permiso) {
    const tipouspermiso = new TipoUsuarioPermiso();
    tipouspermiso.cpermiso = permiso.cpermiso;
    tipouspermiso.ctipousuario = this.id;
    this.listAdd.push(tipouspermiso);
  }

  public removerPermiso(permiso: Permiso) {
    const index: number = this.permisosAsignados.indexOf(permiso);
    this.permisosAsignados.splice(index, 1);
    if (this.onEdit) { this.removeOnEdit(permiso); }
  }

  private removeOnEdit(permiso: Permiso) {
    if (permiso.action) {
      let i = -1;
      this.listTipoUsuarioPermiso.forEach(o => {
        if (o.cpermiso === permiso.cpermiso) {
          i = this.listTipoUsuarioPermiso.indexOf(o);
          o.cpermiso = -1;
          o.ctipousuario = -1;
          this.listDelete.push(o);
        }
      });
      if (i !== -1) { this.listTipoUsuarioPermiso.splice(i, 1); }
    } else {
      let i = -1;
      this.listAdd.forEach(o => {
        if (o.cpermiso === permiso.cpermiso) { i = this.listAdd.indexOf(o); }
      });
      if (i !== -1) { this.listAdd.splice(i, 1); }
    }
  }

  public removerPermisos() {
    if (this.onEdit) { this.removeAllOnEdit(); }
    this.permisosAsignados = [];
    this.listTipoUsuarioPermiso = [];
    this.allPermisos = false;
  }

  private removeAllOnEdit() {
    this.listAdd = [];
    this.listTipoUsuarioPermiso.forEach(o => {
      if (o.ctipouspermiso !== undefined) {
        o.ctipousuario = -1;
        o.cpermiso = -1;
        this.listDelete.push(o);
      }
    });
  }

  private asignarPermisos() {
    this.listTipoUsuarioPermiso = [];
    this.guardarPermisosDeTipoUsuario();
  }

  private createTipoUsuarioPermiso() {
    let tipouspermiso: TipoUsuarioPermiso;
    this.permisosAsignados.forEach(value => {
      tipouspermiso = new TipoUsuarioPermiso();
      tipouspermiso.ctipousuario = this.tipousuario.ctipousuario;
      tipouspermiso.cpermiso = value.cpermiso;
      this.listTipoUsuarioPermiso.push(tipouspermiso);
    });
  }

  private guardarPermisosDeTipoUsuario() {
    this.createTipoUsuarioPermiso();
    this.serviceUsuario.asignarPermisos(this.listTipoUsuarioPermiso).subscribe(data => {
      if (data) {
        this.load = false;
        this.navigateList();
      }
    });
  }

  getPermisosAsignadosDeTipoUsuario() {
    this.serviceUsuario.getPermisosAsigadosDeTipoUsuario(this.tipousuario.ctipousuario)
      .subscribe(data => {
        this.setPermisosAsignadosDeTipoUsuario(data);
      });
  }

  private setPermisosAsignadosDeTipoUsuario(data: any[]) {
    if (data.length !== 0) {
      this.load = true;
      this.listTipoUsuarioPermiso = data;
      this.getPermisos();
    }
  }

  private getPermisos() {
    this.servicePermiso.getListPermisosById(this.listTipoUsuarioPermiso)
      .subscribe(data => { this.setPermisos(data); });
  }

  private setPermisos(data: any[]) {
    this.load = false;
    if (data.length !== 0) {
      data.forEach(o => { o.action = true; });
      this.permisosAsignados = data;
    }
  }

  public cancelar() {
    this.navigateList();
  }

  private removeItemFromLocalStorage() {
    localStorage.removeItem('tipousuarioId');
  }

  private navigateList() {
    this.removeItemFromLocalStorage();
    this.router.navigate(['usuarios/tipos']);
  }

  public eliminar() {
    this.load = true;
    this.serviceUsuario.eliminarTipoUsuario(this.id).subscribe(data => {
      this.load = false;
      if (data) {
        this.navigateList();
      }
    });
  }

  public asignarTodo() {
    this.servicePermiso.getPermisos().subscribe(data => {
      data.forEach(val => {
        this.permisosAsignados.push(val);
        this.allPermisos = true;
      });
    });
  }

}
