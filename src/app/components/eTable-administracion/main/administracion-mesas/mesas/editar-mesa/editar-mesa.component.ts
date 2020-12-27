import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PerfilMesa } from 'src/app/domain/PerfilMesa';
import { MesasService } from 'src/app/services/administracion/administracion-mesas/mesas.service';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';
import { Path } from 'src/app/infrastructure/constans/Path';
import { Mesa } from 'src/app/domain/Mesa';
import { EstadoMesa } from 'src/app/domain/EstadoMesa';
import { PerfilMesasService } from 'src/app/services/administracion/administracion-mesas/perfil-mesas.service';
import { EstadoMesasService } from 'src/app/services/administracion/administracion-mesas/estado-mesas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-mesa',
  templateUrl: './editar-mesa.component.html',
  styleUrls: []
})
export class EditarMesaComponent implements OnInit {
  public id: number;
  public mesa: Mesa;
  public load: boolean;
  public loading: string;
  public empty: boolean;
  public successText: string;
  public pmcompuesta : boolean;
  public success: boolean;
  public tiposPerfilMesas: PerfilMesa[];
  public tiposEstadoMesa: EstadoMesa[];
  public selectedTypePerfil: number;
  public selectedTypeEstado: number;

  constructor(private router: Router,
    private activedRouter: ActivatedRoute,  private serviceMesas: MesasService, 
    private servicePerfilMesas: PerfilMesasService,private serviceEstadoMesas: EstadoMesasService)  {
    this.mesa = new Mesa();
    this.load = true;
    this.empty = false;
    this.loading = Path.loading;
    this.success = false;
  }

  ngOnInit() {
    this.load=false;
    this.getPerfilMesa();
   this.getEstadoMesa();
   this.getIdMesa();
  }
  private getPerfilMesa() {
    this.servicePerfilMesas.getPerfilesMesa().subscribe(data => {
      this.tiposPerfilMesas = data;
    });
  }
  private getEstadoMesa() {
    this.serviceEstadoMesas.getEstadosMesas().subscribe(data => {
      this.tiposEstadoMesa = data;
    });
  }
  private getIdMesa() {
    this.activedRouter.params.subscribe(data => {

      if (data.id !== 0) {
        this.id = data.id;
        console.log("id ",this.id);

        this.serviceMesas.getMesaById(this.id).subscribe(o => {
          if (o !== null) {
            this.mesa = o;
            this.selectedTypePerfil = this.mesa.cperfilmesa;
            this.selectedTypeEstado = this.mesa.cestadomesa;
            console.log(this.mesa);
           
             } else {  this.navigateList();    }
       
      } ) ;  }
      else {
         this.navigateList();
      }
    });
  }



  private isEmpytText(info: string, msg: string) {
    if (info === undefined || info.trim().length === 0) {
      this.successText = msg;
      return true;
    }
  }
  private isEmpytNum(info: number, msg: string) {
    if (info === undefined || info == 0) {
      this.successText = msg;
      return true;
    }
  }

  private isEmpty() {
    
    if (this.isEmpytText(this.mesa.nombremesa, Mensaje.emptyNomMesa)) {
      return true;
    }
    if (this.isEmpytNum(this.selectedTypePerfil, Mensaje.emptyDescMesa)) {
      return true;
    }
    if (this.isEmpytNum(this.selectedTypeEstado, Mensaje.emptyCapacMesa)) {
      return true;
    }
   
  } 

  public guardar() {
    this.success = this.isEmpty();
    this.empty = this.isEmpty();
    if (!this.empty) {
      //entro
      this.load = true;
      this.mesa.cperfilmesa = this.selectedTypePerfil;
      this.mesa.cestadomesa = this.selectedTypeEstado;
      console.log("this.mesa",this.mesa);
      this.serviceMesas.editarMesaById(this.mesa, this.mesa.cmesa).subscribe(data => {
        if (data != null) {
          console.log("data",data);
           // this.guardarCliente();
           this.navigateList();
        } else {
          this.load = false;
          this.empty = true;
          this.successText = 'El nombre de mesa ya existe';
        }
      });
    }
  }

 
  cancelar(){
    this.navigateList();
  }


  private navigateList() {
    this.router.navigate(['mesas/list']);
  }
/*
  public eliminar() {
    const c = confirm('Eliminar mesa');
    if (c === true) {
      this.load = true;
      this.serviceMesas.deleteMesaById(this.mesa.cmesa).subscribe(data => {
        if (data) {
          this.navigateList();
        } else {
          this.load = false;
          this.success = true;
          this.successText = 'No se puede eliminar esta mesa';
        }
      }, error => {
        if (error) {
          this.load = false;
          this.success = true;
          this.successText = 'Sucedió un error con el servidor';
        }
      });
    }
  }*/

  public eliminar() {
 
 
    Swal.fire({
      title: 'Estas seguro que deseas eliminar la mesa?',
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
        this.serviceMesas.deleteMesaById(this.mesa.cmesa).subscribe(data => {
          if (data) {
            Swal.fire(
              'Eliminada!',
              'La mesa se elimino correctamente.',
              'success'
            );
            this.navigateList();
          } else {
            this.load = false;
            this.success = true;
            this.successText = 'No se puede eliminar esta mesa';
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


}
