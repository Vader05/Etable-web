import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/domain/User';
import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';
import { Path } from 'src/app/infrastructure/constans/Path';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: User[];
  estado: boolean;
  sinUsuarios: boolean;
  public load: boolean;
  public loading: string;

  constructor(
    private router: Router,
    private service: UsuarioService) {
    this.estado = false;
    this.sinUsuarios = false;
    this.load = true;
    this.loading = Path.loading;
   }

  ngOnInit() {
    this.getUsuarios();
  }

  cambiarEstadoUsuario(id: number, estado: boolean) {
    this.estado = !this.estado;
  }

  nuevoUsuario() {
    this.router.navigate(['usuarios/crear']);
  }

  editarUsuario(id: number) {
    this.router.navigate(['usuarios/editar/' + id]);
  }

  private getUsuarios() {
    this.service.getUsarios().subscribe(data => {
      this.load = false;
      this.usuarios = data;
      if (this.usuarios.length !== 0) {
        this.sinUsuarios = false;
      }
    });
  }
}
