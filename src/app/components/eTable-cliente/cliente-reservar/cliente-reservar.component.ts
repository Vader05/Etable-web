import { Component, OnInit } from '@angular/core';
import { ReservacionService } from 'src/app/services/administracion/reservacion/reservacion.service';
import { Reservacion } from 'src/app/domain/Reservacion';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/domain/Cliente';
import Swal from 'sweetalert2'
import { User } from 'src/app/domain/User';
import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';

@Component({
  selector: 'app-cliente-reservar',
  templateUrl: './cliente-reservar.component.html',
  styleUrls: ['./cliente-reservar.component.css']
})
export class ClienteReservarComponent implements OnInit {
  public empty: boolean;
  public reservacion: Reservacion;
  public user : User ;
  public cliente : Cliente;
  public successText :string;
  public idCliente :number


  constructor(private activedRouter: ActivatedRoute,private router: Router,
    private service: ReservacionService, private usuarioservice: UsuarioService) { 
    this.empty = false;
    this.reservacion = new Reservacion();
    this.idCliente = 0;
    this.successText = " ";
    this.user = new User();
  }

  ngOnInit() {
      
      this.getUserName();
  }

  private getUserName() {

    this.user.nickname = localStorage.getItem('nickname').toString();
    this.user.password = localStorage.getItem('password').toString();
    this.usuarioservice.getUsuarioByAuthentication(this.user).subscribe(o => {
      if (o !== null) {
        this.user = o;

        this.obtenerClientebyUsuario();
      }
    }, error => {
      if (error) {
        // this.authentication = false;
        localStorage.clear();
      }
    });
  }

  private obtenerClientebyUsuario()  {
    var cusuario = this.user.cusuario ; 
   
      this.service.obtenerClientebyUsuario(cusuario).subscribe(o => {
        if (o !== null) {
          this.cliente = o;
          
          console.log("cliente ",this.cliente);
          this.idCliente = this.cliente.ccliente;
           } else { 
              this.navigateList();  
          
          }
     
    } ) ;  
}
  private isEmpytNum(info: number, msg: string) {
    if (info === undefined || info == 0) {
      this.successText = msg;
      return true;
    }
  }
  private isEmpytText(info: string, msg: string) {
    if (info === undefined || info.trim().length === 0) {
      this.successText = msg;
      return true;
    }
  }
  private isEmpty() {
    if (this.isEmpytText(this.reservacion.fecha, Mensaje.emptyFecha)) {
      return true;
    }
    if (this.isEmpytText(this.reservacion.hora, Mensaje.emptyHora)) {
      return true;
    }
    if (this.isEmpytNum(this.reservacion.cantidad, Mensaje.emptyCantidad)) {
      return true;
    }
 
  }
  

  public register() {
    this.empty = this.isEmpty();
    if (!this.empty) {

      console.log("Resrevb", this.reservacion);
      
      this.reservacion.ccliente = this.idCliente; //local storage
      this.reservacion.cestado = 1;
      this.reservacion.confirmada = false;
      console.log("previa", this.reservacion);
      
      this.service.crearReservacion(this.reservacion).subscribe(o => {
        console.log(o);

         Swal.fire({
           position: 'center',
           icon: 'success',
           title: 'Reserva creada con Exito',
           showConfirmButton: false,
           timer: 1500
         });

                    setTimeout(()=>{   
                      this.router.navigate(['clientes/misReservas']);
                }, 2000);
      }); 
    }else {
      
            Swal.fire(
              'Campos Incompletos',
              this.successText +'',
              'question'
            )

    }
  }

  private navigateList() {
    this.router.navigate(['clientes/misReservas']);
  }




}
