import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from 'src/app/domain/Mesa';
import { MesasService } from 'src/app/services/administracion/administracion-mesas/mesas.service';
import { EstadoMesa } from 'src/app/domain/EstadoMesa';
import { EstadoMesasService } from 'src/app/services/administracion/administracion-mesas/estado-mesas.service';
import { ReservacionService } from 'src/app/services/administracion/reservacion/reservacion.service';
import { ReservacionDTOCli } from 'src/app/domain/ReservacionDTOCli';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programacion-mesa',
  templateUrl: './programacion-mesa.component.html',
  styleUrls: []
})
export class ProgramacionMesaComponent implements OnInit {
  estado: boolean;
  prueba : string;
  public id: number;
  mesas: Mesa[];
  reservacionesdto: ReservacionDTOCli[];
  estadomesa : EstadoMesa;
  load: boolean;
  loading: string;
   constructor(private service: ReservacionService , private router: Router, private serviceMesas: MesasService , 
    private serviceestadomesa: EstadoMesasService ) {
     this.estado = false;
    }
    
  ngOnInit() {
    this.obtenerReservaciones();
   
  }
  
  obtenerReservaciones(){
    this.service.getReservacionesDTO().subscribe(data => 
      { 
       this.load=false;
       this.reservacionesdto = data;
       console.log("reservacionesdto" ,this.reservacionesdto);

      } 
    )}
   

    revisar(id: number) {
     
      Swal.fire({
        title: 'Estas seguro que deseas confirmar la reservación?',
        // text: "S",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.service.revisarReservacionById(id).subscribe(data => {
            if (data) {  console.log("1");
            Swal.fire(
              'Confirmada!',
              'La reservacion fue confirmada correctamente.',
              'success'
            );
            this.obtenerReservaciones();
            
            } else {  console.log("2");
            // this.obtenerReservacionesbyCliente(this.idCliente);
            }
          }, error => {
            if (error) {   console.log("error ",error);
            // this.obtenerReservaciones();
            }
          });
         }
      })
    } 

  private navigateList() {
    this.router.navigate(['mesas/list']);
    // window.location.reload();
    // this.router.navigateByUrl('/mesas/perfiles', {skipLocationChange: true}).then(()=>
    // this.router.navigate(["/mesas/perfiles"])); 

  }

}
