import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';
import { User } from 'src/app/domain/User';

import { MainMenuService } from 'src/app/services/administracion/sistema/main-menu.service';
import { MenuItem } from 'src/app/domain/MainMenu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck {

  public user: User;
  public success: boolean;
  public items: MenuItem[];
  public authentication: boolean;
  title: string;
  admsis: boolean;
  admus: boolean;
  admme: boolean;
  admcl: boolean;
  admda: boolean;
  admre: boolean;

  public sistema: boolean;
  public usuarios: boolean;
  public mesas: boolean;
  public clientes: boolean;
  public dashboard: boolean;
  public reportes: boolean;

  constructor(private serviceUsuario: UsuarioService, private serviceMenu: MainMenuService) {
    this.user = new User();
    this.admsis = false;
    this.admus = false;
    this.admme = false;
    this.admcl = false;
    this.admda = false;
    this.admre = false;
    this.success = true;
    this.initAccesoSistema(false);
  }

  ngOnInit() {
      
  }

  ngDoCheck() {
    if (this.success) {
      const auth = localStorage.getItem('authentication');
      this.getAuth(auth);
      this.getUserName();
    } else {
      const auth = localStorage.getItem('authentication');
      this.getAuth(auth);
    }
  }

  private initAccesoSistema(b: boolean) {
    this.sistema = b;
    this.usuarios = b;
    this.mesas = b;
    this.clientes = b;
    this.dashboard = b;
    this.reportes = b;

    this.admsis = b;
    this.admus = b;
    this.admme = b;
    this.admcl = b;
    this.admda = b;
    this.admre = b;
  }

  getAuth(auth: string) {
    if (auth === 'true') {
      this.success = false;
      this.authentication = true;
    } else {
      this.success = true;
      this.initAccesoSistema(false);
      this.authentication = false;
    }
  }

  private getUserName() {
    if (localStorage.getItem('nickname') != null && localStorage.getItem('password') != null) {
      this.user.nickname = localStorage.getItem('nickname').toString();
      this.user.password = localStorage.getItem('password').toString();
      this.serviceUsuario.getUsuarioByAuthentication(this.user).subscribe(o => {
        if (o !== null) {
          this.user = o;
          if (this.user.ctipousuario === 2) {
            localStorage.setItem('esCliente', 'true');
          } else {
            localStorage.setItem('esCliente', 'false');
          }
          this.getAccesoSistema();
        }
      }, error => {
        if (error) {
          localStorage.clear();
        }
      });
    }
  }

  private getAccesoSistema() {
    this.serviceMenu.getAccesoByTipoUsuario(this.user.ctipousuario).subscribe(data => {
      this.items = data;
      this.setAccesoSistema();
    });
  }

  private setAccesoSistema() {
    this.items.forEach(val => {
      switch (val.citem) {
        case 1:
          this.sistema = true;
          break;
        case 2:
          this.usuarios = true;
          break;
        case 3:
          this.mesas = true;
          break;
        case 4:
          this.clientes = true;
          break;
        case 5:
          this.dashboard = true;
          break;
        case 6:
          this.reportes = true;
          break;
      }
    });
  }

  show(id: number) {
    switch (id) {
      case 1:
        this.admsis = !this.admsis;
        this.admus = false;
        this.admme = false;
        this.admcl = false;
        this.admda = false;
        this.admre = false;
        break;
      case 2:
        this.admus = !this.admus;
        this.admsis = false;
        this.admme = false;
        this.admcl = false;
        this.admda = false;
        this.admre = false;
        break;
      case 3:
        this.admme = !this.admme;
        this.admsis = false;
        this.admus = false;
        this.admcl = false;
        this.admda = false;
        this.admre = false;
        break;
      case 4:
        this.admcl = !this.admcl;
        this.admsis = false;
        this.admus = false;
        this.admme = false;
        this.admda = false;
        this.admre = false;
        break;
      case 5:
        this.admda = !this.admda;
        this.admsis = false;
        this.admus = false;
        this.admme = false;
        this.admcl = false;
        this.admre = false;
        break;
      case 6:
        this.admre = !this.admre;
        this.admsis = false;
        this.admus = false;
        this.admme = false;
        this.admcl = false;
        this.admda = false;
        break;
    }
  }

  setTitle(id: number) {
    switch (id) {
      case 1:
        this.setLocalStorageTitle('Admin. del Sistema - Sistema General');
        break;
      case 2:
        this.setLocalStorageTitle('Admin. del Sistema - Configuración');
        break;
      case 3:
        this.setLocalStorageTitle('Admin. de Usuarios - Tipos de Usuario');
        break;
      case 4:
        this.setLocalStorageTitle('Admin. de Usuarios - Usuarios');
        break;
      case 5:
        this.setLocalStorageTitle('Admin. de Usuarios - Permisos');
        break;
      case 6:
        this.setLocalStorageTitle('Admin. de Mesas - Mesas');
        break;
      case 7:
        this.setLocalStorageTitle('Admin. de Mesas - Perfil de Mesa');
        break;
      case 8:
        this.setLocalStorageTitle('Admin. de Mesas - Programación');
        break;
      case 9:
        this.setLocalStorageTitle('Admin. de Clientes - Clientes');
        break;
      case 10:
        this.setLocalStorageTitle('Admin. de Clientes - Tipo de Cliente');
        break;
      case 11:
        this.setLocalStorageTitle('Admin. de Clientes - Historial');
        break;
      case 12:
        this.setLocalStorageTitle('Dashboard - Reservaciones');
        break;
      case 13:
        this.setLocalStorageTitle('Reportes - Importes/Exportar');
        break;
    }

  }

  setLocalStorageTitle(title: string) {
    this.title = title;
    localStorage.setItem('title', this.title);
  }
}
