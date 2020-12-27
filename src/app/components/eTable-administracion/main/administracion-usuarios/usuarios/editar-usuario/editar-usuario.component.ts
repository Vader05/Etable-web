import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/domain/User';
import { Path } from 'src/app/infrastructure/constans/Path';
import { Cliente } from 'src/app/domain/Cliente';
import { TipoUsuario } from 'src/app/domain/TipoUsuario';
import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';
import { TipoUsuarioService } from 'src/app/services/administracion/administracion-usuarios/tipo-usuario.service';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: []
})
export class EditarUsuarioComponent implements OnInit {
  public tiposUsuario: TipoUsuario[];
  public id: number;
  public user: User;
  public cliente: Cliente;
  public load: boolean;
  public loading: string;
  public passDiferente: boolean;
  public selectedTypeId: number;
  public esCliente: boolean;
  public passw: string;
  public changePassword: boolean;
  public success: boolean;
  public successText: string;

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private servicesTipoUsuario: TipoUsuarioService,
    private serviceUsuario: UsuarioService) {
    this.load = true;
    this.loading = Path.loading;
    this.passDiferente = false;
    this.user = new User();
    this.cliente = new Cliente();
    this.changePassword = false;
    this.success = false;
  }

  ngOnInit() {
    this.getTiposUsuario();
    this.getIdUsuario();
  }

  private getIdUsuario() {
    this.activedRouter.params.subscribe(data => {
      if (data.id !== 0) {
        this.id = data.id;
        this.serviceUsuario.getUsuarioById(this.id).subscribe(o => {
          if (o !== null) {
            this.user = o;
            this.selectedTypeId = this.user.ctipousuario;
            this.selectedTipoUsuario();
            this.passw = this.user.password;
            this.load = false;
          } else {
            this.navigateList();
          }
        });
      } else {
        this.navigateList();
      }
    });
  }

  public selectedTipoUsuario() {
    if (this.selectedTypeId === 2) {
      this.esCliente = true;
    } else {
      this.esCliente = false;
    }
  }

  public guardar() {
    this.success = this.isEmpty();
    if (!this.success) {
      this.load = true;
      this.user.ctipousuario = this.selectedTypeId;
      this.serviceUsuario.editUserById(this.user).subscribe(data => {
        if (data != null) {
          if (this.esCliente) {
            this.guardarCliente();
          } else {
            this.navigateList();
          }
        } else {
          this.load = false;
          this.success = true;
          this.successText = 'Nombre de usuario ya existe';
        }
      });
    }
  }

  private guardarCliente() {
    this.cliente.cusuario = this.user.cusuario;
    console.log(this.cliente);
    this.serviceUsuario.editCliente(this.cliente).subscribe(data => {
      if (data != null) {
        this.navigateList();
      } else {
        this.success = true;
        this.successText = 'No se pudo editar o crear el usuario de tipo cliente';
      }
    });
  }

  

  public eliminar() {
     
    Swal.fire({
      title: 'Estas seguro que deseas Eliminar usuario',
      // text: "S",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.serviceUsuario.deleteUserById(this.user.cusuario).subscribe(data => {
                 if (data) {
                   this.navigateList();
                 } else {
                   this.load = false;
                   this.success = true;
                   this.successText = 'No se puede eliminar este usuario';
                 }
               }, error => {
                 if (error) {
                   this.load = false;
                   this.success = true;
                   this.successText = 'Sucedió un error con el servidor';
                 }
               });
       }
    })
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

  public cancelar() {
    this.navigateList();
  }

  private navigateList() {
    this.router.navigate(['usuarios/list']);
  }

  private getTiposUsuario() {
    this.servicesTipoUsuario.getTiposUsuario().subscribe(data => {
      this.tiposUsuario = data;
    });
  }

  public newPassword() {
    this.changePassword = true;
    this.user.password = '';
    this.passw = '';
  }

  public cambiarEstado() {
    this.user.estado = !this.user.estado;
  }
}
