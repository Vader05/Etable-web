import { Component, OnInit} from '@angular/core';
import { Path } from 'src/app/infrastructure/constans/Path';
import { User } from 'src/app/domain/User';

import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';
import { Cliente } from 'src/app/domain/Cliente';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {


  public logo: string;
  public loading: string;
  public load: boolean;
  public empnombre: string;
  public empty: boolean;
  public successText: string;
  public cliente: Cliente;
  public user: User;

  constructor(private service: UsuarioService) {
    this.user = new User();
    this.cliente = new Cliente();
    this.load = false;
    this.loading = Path.loading;
    this.empnombre = '';
    this.empty = false;
    this.successText = '';
  }

  ngOnInit() {
    this.empnombre = localStorage.getItem('empnombre');
    this.logo = localStorage.getItem('emplogo');
    if (this.logo.length === 0) {
      this.logo = Path.logo;
    }
  }

  public register() {
    this.empty = this.isEmpty();
    if (!this.empty) {
      this.load = true;
      this.user.ctipousuario = 2;
      this.service.crearCliente(this.user, this.cliente).subscribe(o => {
        this.navigate();
      });
    }
  }

  public backLogin() {
    this.navigate();
  }

  private navigate() {
    localStorage.removeItem('emplogo');
    localStorage.removeItem('empnombre');
    localStorage.removeItem('registration');
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
