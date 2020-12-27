import { Component, OnInit } from '@angular/core';
import { ReservacionService } from 'src/app/services/administracion/reservacion/reservacion.service';
import { Reservacion } from 'src/app/domain/Reservacion';
import { ReservacionDTO } from 'src/app/domain/ReservacionDTO';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/domain/Cliente';
import Swal from 'sweetalert2'
import { User } from 'src/app/domain/User';
import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';

@Component({
  selector: 'app-cliente-mis-reservas',
  templateUrl: './cliente-mis-reservas.component.html',
  styleUrls: ['./cliente-mis-reservas.component.css']
})
export class ClienteMisReservasComponent implements OnInit  {
  public empty: boolean;
  public reservaciones: Reservacion[];
  public reservacionesDTO: ReservacionDTO[];
  public reservacion: Reservacion;
  public reservacionDTO: ReservacionDTO;
  public user : User ;
  public cliente : Cliente;
  public successText :string;
  public idCliente :number;
  public  pageActual : number ;

 
  constructor(private activedRouter: ActivatedRoute,private router: Router,
    private service: ReservacionService, private usuarioservice: UsuarioService) { 
    this.empty = false;
    this.idCliente = 0;
    this.successText = " ";
    this.user = new User();
    this.pageActual = 1;
   
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

          this.obtenerReservacionesbyCliente(this.idCliente);
           } else { 
              this.navigateList();  
          
          }
     
    } ) ;  
}

obtenerReservacionesbyCliente(id:number){
  this.service.getReservacionesDTObyCliente(id).subscribe(data => 
    { console.log("data",data);
    //  this.load=false;
     this.reservacionesDTO =data;
     }
  )
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
)} }

  private navigateList() {
    this.router.navigate(['clientes/misReservas']);
  }

  public anularReservacion(reservacionDTO: ReservacionDTO) {
    console.log(reservacionDTO);
    var id = reservacionDTO.creserva;
   var c = false;
 
    Swal.fire({
      title: 'Estas seguro que deseas eliminarlo?',
      // text: "S",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Anular',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Anulado!',
          'El Registro se anulo correctamente.',
          'success'
        );
       }
        console.log("entro");
        this.reservacionesDTO=[];
         this.service.anularReservacionById(id).subscribe(data => {
          if (data) {  console.log("1");
          this.obtenerReservacionesbyCliente(this.idCliente);
          
          } else {  console.log("2");
          this.obtenerReservacionesbyCliente(this.idCliente);
          }
        }, error => {
          if (error) {   console.log("3");
            this.navigateList();
          }
        }); 
     
    })

  } 

}

