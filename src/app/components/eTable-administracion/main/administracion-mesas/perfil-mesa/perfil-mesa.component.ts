import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilMesa } from 'src/app/domain/PerfilMesa';
import { Path } from 'src/app/infrastructure/constans/Path';
import { PerfilMesasService } from 'src/app/services/administracion/administracion-mesas/perfil-mesas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-mesa',
  templateUrl: './perfil-mesa.component.html',
  styleUrls: ['./perfil-mesa.component.css']
})
export class PerfilMesaComponent implements OnInit {

  public id: number;
  public perfiles: PerfilMesa[];
  perfilMesa: PerfilMesa;
  load: boolean;
  loading: string;
  public success: boolean;
  public successText: string;

  constructor(
    private router: Router,
    private servicePerfilMesas: PerfilMesasService,
    private activedRouter: ActivatedRoute, private zone: NgZone) {
    this.load = true;
    this.loading = Path.loading;
    this.success = false;
  }

  ngOnInit() {
    this.obtenerPerfilesMesa();
  }

  nuevoPerfil() {
    this.router.navigate(['mesas/perfiles/crear']);
  }
  editarPerfilMesa(id: number) {
    this.router.navigate(['mesas/perfiles/editar/' + id]);
  }




  public eliminarPerfilMesa(id: number) {
     
    Swal.fire({
      title: 'Estas seguro que deseas Eliminar perfil de Mesa',
      // text: "S",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.servicePerfilMesas.deletePerfilMesaById(id).subscribe(data => {
                 if (data) {
                   console.log("1");
                   this.load = false;
                   this.navigateList();
                 } else {
                   console.log("2");
                   this.load = false;
                   this.navigateList();
                   this.success = true;
                   // this.successText = 'No se puede eliminar este perfil Mesa';
                 }
               }, error => {
                 if (error) {
                   console.log("3");
                   this.load = false;
                   this.navigateList();
                   this.success = true;
                   // this.successText = 'Sucedió un error con el servidor';
                 }
               });
       }
    })
  } 


  obtenerPerfilesMesa() {
    this.servicePerfilMesas.getPerfilesMesa().subscribe(data => {
      this.load = false;
      this.perfiles = data;
    }
    )
  }

  private navigateList() {
    this.router.navigate(['mesas/perfiles/crear']);
    // window.location.reload();
    // this.router.navigateByUrl('/mesas/perfiles', {skipLocationChange: true}).then(()=>
    // this.router.navigate(["/mesas/perfiles"])); 

  }

}
