import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoUsuarioService } from 'src/app/services/administracion/administracion-usuarios/tipo-usuario.service';
import { TipoUsuario } from 'src/app/domain/TipoUsuario';
import { User } from 'src/app/domain/User';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';
import { Cliente } from 'src/app/domain/Cliente';
import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';
import { Path } from 'src/app/infrastructure/constans/Path';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  public tiposUsuario: TipoUsuario[];
  public user: User;
  public empty: boolean;
  public successText: string;
  public esCliente: boolean;
  public selectedTypeId: number;
  public cliente: Cliente;
  public load: boolean;
  public loading: string;
  public passDiferente: boolean;
  public passw: string;

  constructor(
    private router: Router,
    private servicesTipoUsuario: TipoUsuarioService,
    private serviceUsuario: UsuarioService) {
    this.user = new User();
    this.cliente = new Cliente();
    this.empty = false;
    this.esCliente = false;
    this.selectedTypeId = 0;
    this.load = true;
    this.loading = Path.loading;
    this.passDiferente = false;
  }

  ngOnInit() {
    this.getTiposUsuario();
  }

  public cancelar() {
    this.navigateList();
  }

  public guardar() {
    this.user.ctipousuario = this.selectedTypeId;
    this.user.estado = true;
    this.empty = this.isEmpty();
    if (!this.empty) {
      this.load = true;
      this.passDiferente = this.passwordDiferente();
      if (!this.passDiferente) {
        if (!this.esCliente) {
          this.crearUsuario();
        } else {
          this.crearCliente();
        }
      } else {
        this.load = false;
      }

    }
  }

  private passwordDiferente() {
    if (this.user.password === this.passw) {
      return false;
    }
    return true;
  }

  private crearUsuario() {
    this.serviceUsuario.crearUsuario(this.user)
      .subscribe(o => {
        this.load = false;
        if (o) {
          this.navigateList();
        } else {
          this.empty = true;
          this.successText = 'El nombre de usuario ya existe, pruebe otro.';
        }
      });
  }

  private crearCliente() {
    this.serviceUsuario.crearCliente(this.user, this.cliente)
    .subscribe(o => {
      this.load = false;
      if (o) {
        this.navigateList();
      } else {
        this.empty = true;
        this.successText = 'El nombre de usuario ya existe, pruebe otro.';
      }
    });
  }

  private navigateList() {
    this.router.navigate(['usuarios/list']);
  }

  private getTiposUsuario() {
    this.servicesTipoUsuario.getTiposUsuario().subscribe(data => {
      this.tiposUsuario = data;
      this.load = false;
    });
  }

  private isEmpty() {
    if (this.selectedTypeId === 0) {
      this.successText = 'Seleccione el tipo de usuario';
      return true;
    }
    if (this.isEmpytText(this.user.usnombres, Mensaje.emptyName)) {
      return true;
    }
    if (this.isEmpytText(this.user.usapellidos, Mensaje.emptyName)) {
      return true;
    }
    if (this.isEmpytText(this.user.nickname, Mensaje.notUserEmpty)) {
      return true;
    }
    if (this.isEmpytText(this.user.password, Mensaje.emptyPass)) {
      return true;
    }
    if (this.esCliente) {
      if (this.isEmpytText(this.cliente.email, Mensaje.emptyEmail)) {
        return true;
      }
      if (this.isEmpytText(this.cliente.phone, Mensaje.emptyPhone)) {
        return true;
      }
      if (this.isEmpytText(this.cliente.date, Mensaje.emptyDate)) {
        return true;
      }
      if (this.isEmpytText(this.cliente.dni.toString(), Mensaje.emptyDNI)) {
        return true;
      }
    }
  }

  private isEmpytText(info: string, msg: string) {
    if (info === undefined || info.trim().length === 0) {
      this.successText = msg;
      return true;
    }
  }

  public selectedTipoUsuario() {
    if (this.selectedTypeId === 2) {
      this.esCliente = true;
    } else {
      this.esCliente = false;
    }
  }
}
