import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/domain/Cliente';
import { User } from 'src/app/domain/User';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';
import { ClientService } from 'src/app/services/administracion/administracion-clientes/clientes.service';
import { Path } from 'src/app/infrastructure/constans/Path';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: []
})
export class CrearClienteComponent implements OnInit {

  public user: User;
  public empty: boolean;
  public successText: string;
  public cliente: Cliente;
  public load: boolean;
  public loading: string;
  public passDiferente: boolean;
  public passw: string;

  constructor(
    private router: Router,
    private serviceUsuario: UsuarioService,
    private serviceCliente: ClientService) {
    this.user = new User();
    this.cliente = new Cliente();
    this.empty = false;
    this.load = false;
    this.loading = Path.loading;
    this.passDiferente = false;
  }

  ngOnInit() {
  }

  guardar() {
    this.empty = this.isEmpty();
    if (!this.empty) {
      this.load = true;
      this.user.ctipousuario = 2;
      this.serviceUsuario.crearCliente(this.user, this.cliente).subscribe(o => {
        this.load = false;
        if (o) {
          this.navigateList();
        } else {
          this.empty = true;
          this.successText = 'El nombre de usuario ya existe, pruebe otro.';
        }
      });
    }
  }
  cancelar() {
    this.navigateList();
  }

  private navigateList() {
    this.router.navigate(['clientes/list']);
  }

  private isEmpty() {
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

  private isEmpytText(info: string, msg: string) {
    if (info === undefined || info.trim().length === 0) {
      this.successText = msg;
      return true;
    }
  }
}
