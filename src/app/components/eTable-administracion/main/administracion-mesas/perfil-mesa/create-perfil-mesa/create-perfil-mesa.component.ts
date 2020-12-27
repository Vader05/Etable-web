import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilMesa } from 'src/app/domain/PerfilMesa';
import { PerfilMesasService } from 'src/app/services/administracion/administracion-mesas/perfil-mesas.service';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';
import { Path } from 'src/app/infrastructure/constans/Path';

@Component({
  selector: 'app-create-perfil-mesa',
  templateUrl: './create-perfil-mesa.component.html',
  styleUrls: []
})
export class CreatePerfilMesaComponent implements OnInit {

  public perfilMesa: PerfilMesa;
  public load: boolean;
  public loading: string;
  public empty: boolean;
  public successText: string;
  public pmcompuesta : boolean;

  constructor(private router: Router,  private servicePerfilMesas: PerfilMesasService)  {
    this.perfilMesa = new PerfilMesa();
    this.load = true;
    this.empty = false;
    this.loading = Path.loading;
  }

  ngOnInit() {
    this.load=false;
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
    this.empty = this.isEmpty();
    if (!this.empty) {
      this.load = true;
     
      if(this.pmcompuesta) this.perfilMesa.pmcompuesta = 1;
      else  this.perfilMesa.pmcompuesta = 0;
      console.log(this.perfilMesa);
      this.crearPerfilMesa();
    }
    
  }
  private crearPerfilMesa() {
    this.servicePerfilMesas.crearPerfilMesa(this.perfilMesa)
      .subscribe(o => {
        console.log("o",o);
        this.load = false;
        if (o) {
          this.navigateList();
        } else {
          console.log("e22");
          this.empty = true;
          this.successText = 'El nombre de mesa ya existe, pruebe otro.';
        }
      });
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
}
