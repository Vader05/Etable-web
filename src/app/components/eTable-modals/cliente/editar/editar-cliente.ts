import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/administracion/administracion-clientes/clientes.service';
import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';
import { Cliente } from 'src/app/domain/Cliente';
import { Path } from 'src/app/infrastructure/constans/Path';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';
import { User } from 'src/app/domain/User';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.html'
})
export class EditarClienteComponent implements OnInit {

  public cliente: Cliente;
  public load: boolean;
  public loading: string;
  public passDiferente: boolean;
  public passw: string;
  public empty: boolean;
  public changePassword: boolean;
  public successText: string;

  constructor(
    public dialogRef: MatDialogRef<EditarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ClientService,
    private serviceUsuario: UsuarioService) {
    this.cliente = new Cliente();
    this.empty = false;
    this.load = true;
    this.loading = Path.loading;
    this.passDiferente = false;
    this.changePassword = false;
  }

  ngOnInit() {
    this.getClienteById();
  }

  private getClienteById() {
    this.service.getClienteById(this.data).subscribe(o => {
      this.cliente = o;
      this.passw = this.cliente.password;
    });
  }

  public newPassword() {
    this.changePassword = true;
    this.cliente.password = '';
    this.passw = '';
  }

  private passwordDiferente() {
    if (this.cliente.password === this.passw) {
      return false;
    }
    return true;
  }

  edit() {
    this.empty = this.isEmpty();
    if (!this.empty) {
      this.load = true;
      const user: User = new User();
      user.cusuario = this.cliente.cusuario;
      user.usnombres = this.cliente.usnombre;
      user.usapellidos = this.cliente.usapellidos;
      user.nickname = this.cliente.nickname;
      user.password = this.cliente.password;
      user.estado = this.cliente.estado;
      user.ctipousuario = 2;

      const client: Cliente = new Cliente();
      client.ccliente = this.cliente.ccliente;
      client.dni = this.cliente.dni;
      client.email = this.cliente.email;
      client.date = this.cliente.date;
      client.phone = this.cliente.phone;
      client.cusuario = this.cliente.cusuario;

      console.log('user: ', user);
      console.log('client: ', client);
      this.serviceUsuario.editUserById(user).subscribe(data => {
        if (data != null) {
            this.guardarCliente(client);
        } else {
          this.load = false;
          this.successText = 'Nombre de usuario ya existe';
        }
      });
    }
  }

  private guardarCliente(cliente: Cliente) {
    this.serviceUsuario.editCliente(cliente).subscribe(data => {
      if (data != null) {
        this.successText = 'Se pudo editar o crear el usuario de tipo cliente';
      } else {
        this.successText = 'No se pudo editar o crear el usuario de tipo cliente';
      }
    });
  }

  private isEmpty() {
    if (this.isEmpytText(this.cliente.usnombre, Mensaje.emptyName)) {
      return true;
    }
    if (this.isEmpytText(this.cliente.usapellidos, Mensaje.emptyName)) {
      return true;
    }
    if (this.isEmpytText(this.cliente.nickname, Mensaje.notUserEmpty)) {
      return true;
    }
    if (this.isEmpytText(this.cliente.password, Mensaje.emptyPass)) {
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

  public cambiarEstado() {
    this.cliente.estado = !this.cliente.estado;
  }
}
