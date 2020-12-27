import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/User';
import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';
import { Path } from 'src/app/infrastructure/constans/Path';
import { Configuracion } from 'src/app/domain/Configuracion';
import { SistemaGeneralService } from 'src/app/services/administracion/sistema/sistema-general.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public load: boolean;
  public loading: string;
  public authentication: boolean;
  public user: User;
  public cliente :boolean;
  public configuracion: Configuracion;
  constructor(private service: UsuarioService, private config: SistemaGeneralService) { 
    this.user = new User();
    this.configuracion = new Configuracion();
    this.load = true;
    this.loading = Path.loading;
    this.cliente= true;
  }

  ngOnInit() {
    const auth = localStorage.getItem('authentication');
    this.getAuth(auth);
  }

  private getConfiguracion() {
    this.config.getConfiguracionSistemaGeneral().subscribe(data => {
      this.configuracion = data;
      if (this.configuracion.empnombre == null) {
        this.configuracion.empnombre = 'Sin nombre';
      }
      if (this.configuracion.empdescripcion == null) {
        this.configuracion.empdescripcion = 'Sin descripcion';
      }
    });
  }

  getAuth(auth: string) {
    if (auth === 'true') {
      this.getUserName();
      this.authentication = true;
    } else {
      this.authentication = false;
    }
  }

  private getUserName() {
    this.getConfiguracion();
    this.user.nickname = localStorage.getItem('nickname').toString();
    this.user.password = localStorage.getItem('password').toString();
    this.service.getUsuarioByAuthentication(this.user).subscribe(o => {
      if (o !== null) {
        this.load = false;
        this.user = o;
      }
    }, error => {
      if (error) {
        this.authentication = false;
        localStorage.clear();
      }
    });
  }

}
