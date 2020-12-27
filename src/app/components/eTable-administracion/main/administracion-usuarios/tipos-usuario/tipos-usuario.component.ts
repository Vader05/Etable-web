import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from 'src/app/infrastructure/constans/Path';
import { TipoUsuario } from 'src/app/domain/TipoUsuario';
import { TipoUsuarioService } from 'src/app/services/administracion/administracion-usuarios/tipo-usuario.service';

@Component({
  selector: 'app-tiposusuario',
  templateUrl: './tipos-usuario.component.html',
  styleUrls: []
})
export class TiposUsuarioComponent implements OnInit {

  public load: boolean;
  public loading: string;
  public list: TipoUsuario[];
  sinTipos: boolean;

  constructor(private router: Router, private service: TipoUsuarioService) {
    this.load = true;
    this.loading = Path.loading;
    this.sinTipos = false;
   }

  ngOnInit() {
    this.getTiposUsuario();
  }

  getTiposUsuario() {
    this.service.getTiposUsuario().subscribe(data => {
      this.load = false;
      if (data.length !== 0) {
        this.sinTipos = false;
        this.list = data;
      } else{
        this.sinTipos = true;
      }
    });
  }

  nuevo() {
    this.router.navigate(['usuarios/tipos/crear']);
  }

  editar(tipousuario: TipoUsuario) {
    localStorage.setItem('tipousuarioId', tipousuario.ctipousuario.toString());
    this.router.navigate(['usuarios/tipos/crear']);
  }
}
