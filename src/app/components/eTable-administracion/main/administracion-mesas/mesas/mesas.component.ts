import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from 'src/app/domain/Mesa';
import { MesaDTO } from 'src/app/domain/MesaDTO';
import { MesasService } from 'src/app/services/administracion/administracion-mesas/mesas.service';
import { EstadoMesa } from 'src/app/domain/EstadoMesa';
import { EstadoMesasService } from 'src/app/services/administracion/administracion-mesas/estado-mesas.service';
import Swal from 'sweetalert2';
import { Path } from 'src/app/infrastructure/constans/Path';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesaComponent implements OnInit {
  estado: boolean;
  prueba : string;
  public id: number;
  mesas: Mesa[];
  mesasdto: MesaDTO[];
  estadomesa : EstadoMesa;
  load: boolean;
  loading: string;
   constructor(private router: Router, private serviceMesas: MesasService , 
    private serviceestadomesa: EstadoMesasService ) {
     this.estado = false;
     this.load = true;
      this.loading = Path.loading;
    }

  ngOnInit() {
    this.obtenerMesas();
   
  }
  
  obtenerMesas(){
    this.serviceMesas.getMesas().subscribe(data => 
      { 
       this.load=false;
       this.mesasdto = data;
       console.log("MESAS" ,this.mesasdto);

      } 
    )}
   

  cambiarEstadoMesa(id: number, estado: boolean) {
    this.estado = !this.estado;
  }

  nuevaMesa() {
    this.router.navigate(['mesas/crear']);
  }
  editarMesa(id: number) {
    this.router.navigate(['mesas/editar/' + id]);
  }
  public eliminarMesa(id: number) {
    console.log(id);

///////////////////
Swal.fire({
  title: 'Estas seguro que desea eliminarl la mesa?',
  // text: "S",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Eliminar',
  cancelButtonText: 'Cancelar'
}).then((result) => {
  if (result.value) {
    this.load = true;
    this.serviceMesas.deleteMesaById(id).subscribe(data => {
      if (data) {
        this.load = false;
        Swal.fire(
          'Mesa Elimianda!',
          'El Registro se elimino correctamente.',
          'success'
        );
        this.obtenerMesas();
        Swal.fire(
            'Mesa Elimianda!',
            'El Registro se elimino correctamente.',
            'success'
          );


      } else {
        this.load = false;
        // this.obtenerMesas();
      }
    }, error => {
      if (error) {
        this.load = false;
        // this.obtenerMesas();
       
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
