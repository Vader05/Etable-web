import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PerfilMesa } from 'src/app/domain/PerfilMesa';
import { PerfilMesasService } from 'src/app/services/administracion/administracion-mesas/perfil-mesas.service';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';
import { Path } from 'src/app/infrastructure/constans/Path';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil-mesa',
  templateUrl: './editar-perfil-mesa.component.html',
  styleUrls: []
})
export class EditarPerfilMesaComponent implements OnInit {
  public id: number;
  public perfilMesa: PerfilMesa;
  public load: boolean;
  public loading: string;
  public empty: boolean;
  public successText: string;
  public pmcompuesta : boolean;
  public success: boolean;

  constructor(private router: Router,
    private activedRouter: ActivatedRoute,  private servicePerfilMesas: PerfilMesasService)  {
    this.perfilMesa = new PerfilMesa();
    this.load = true;
    this.empty = false;
    this.loading = Path.loading;
    this.success = false;
  }

  ngOnInit() {
    this.load=false;
    this.getIdPerfilMesa();
  }
  private getIdPerfilMesa() {
    this.activedRouter.params.subscribe(data => {
      if (data.id !== 0) {
        this.id = data.id;
        console.log("id ",this.id);
        this.servicePerfilMesas.getPerfilMesaById(this.id).subscribe(o => {
          if (o !== null) {
            this.perfilMesa = o;
            console.log(this.perfilMesa);
            if(this.perfilMesa.pmcompuesta) this.pmcompuesta =true ;else  this.pmcompuesta =false;
   } else {
            this.navigateList();
          }
        });
      } else {
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
    
    if (this.isEmpytText(this.perfilMesa.pmnombre, Mensaje.emptyNomMesa)) {
      return true;
    }
    if (this.isEmpytText(this.perfilMesa.pmdescripcion, Mensaje.emptyDescMesa)) {
      return true;
    }
    if (this.isEmpytNum(this.perfilMesa.pmcapacidad, Mensaje.emptyCapacMesa)) {
      return true;
    }
    
  
  }

  guardar(){
    this.success = this.isEmpty();
    console.log("this.perfilMesa:  " , this.perfilMesa);
    if (!this.success) {
      this.load = true;
          if(this.pmcompuesta) this.perfilMesa.pmcompuesta = 1;
          else  this.perfilMesa.pmcompuesta = 0;
      this.servicePerfilMesas.editarPerfilMesaById(this.perfilMesa, this.perfilMesa.cperfilmesa).subscribe(data => {
        console.log("data:  " , data)
        if (data != null) {
          this.load = false;
          // if (this.esCliente) {
            // this.guardarPerfilMesa();
          // } else {
            this.navigateList();
          // }
        } else {
          this.load = false;
          this.success = true;
          this.successText = 'Perfil de Mesa ya existe';
        }
      });

    }
    
  }

 
  cancelar(){
    this.navigateList();
  }


  private navigateList() {
    this.router.navigate(['mesas/perfiles']);
  }

   public cambiarEstado() {
     this.pmcompuesta = !this.pmcompuesta;
   }


  eliminar() {
     
    Swal.fire({
      title: 'Estas seguro que deseas Eliminar el perfil de Mesa',
      // text: "S",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.servicePerfilMesas.deletePerfilMesaById(this.perfilMesa.cperfilmesa).subscribe(data => {
                if (data) {
                   this.navigateList();
                } else {
                   this.load = false;
                  this.success = true;
                   this.successText = 'No se puede eliminar este perfil Mesa';
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
