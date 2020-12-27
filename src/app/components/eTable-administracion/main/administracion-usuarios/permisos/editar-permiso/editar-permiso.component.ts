import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermisosService } from 'src/app/services/administracion/administracion-usuarios/permisos.service';
import { Permiso } from 'src/app/domain/Permiso';
import { Path } from 'src/app/infrastructure/constans/Path';

@Component({
  selector: 'app-editar',
  templateUrl: './editar-permiso.component.html',
  styleUrls: ['./editar-permiso.component.css']
})
export class EditarPermisoComponent implements OnInit {

  permiso: Permiso;
  load: boolean;
  loading: string;
  btn: string;

  constructor(private router: Router, private service: PermisosService) {
    this.permiso = new Permiso();
    this.load = true;
    this.loading = Path.loading;
   }

  ngOnInit() {
    this.getPermisoIdLocalStorage();
  }

  getPermisoIdLocalStorage() {
    const id = localStorage.getItem('permisoId');
    this.getPermisoById(+id);
  }

  getPermisoById(id: number) {
    this.service.getPermisoById(id).subscribe(data => {
      if (data !== null) {
        this.load = false;
        this.permiso = data;
        this.setBtnText();
      }
    });
  }

  guardar() {
    this.removeLocalStorage();
    this.load = true;
    this.service.actualizarPermiso(this.permiso).subscribe(data => {
      if ( data !== null) {
        this.load = false;
        localStorage.setItem('editSuccess', 'true');
        this.router.navigate(['usuarios/permisos']);
      }
    });
  }

  habilitar() {
    this.permiso.estado = !this.permiso.estado;
    this.setBtnText();
  }

  setBtnText() {
    this.btn = (this.permiso.estado ? 'Habilitado' : 'Deshabilitado');
  }

  cancelar() {
    this.removeLocalStorage();
    this.router.navigate(['usuarios/permisos']);
  }

  removeLocalStorage() {
    localStorage.removeItem('permisoId');
  }
}
