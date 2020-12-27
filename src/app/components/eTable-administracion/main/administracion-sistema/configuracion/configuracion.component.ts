import { Component, OnInit } from '@angular/core';
import { Configuracion } from 'src/app/domain/Configuracion';
import { Path } from 'src/app/infrastructure/constans/Path';
import { SistemaGeneralService } from 'src/app/services/administracion/sistema/sistema-general.service';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  configuracion: Configuracion;
  prevconfiguracion: Configuracion;
  load: boolean;
  edit: boolean;
  saving: boolean;
  loading: string;
  btn: string;
  empty: boolean;
  emptyText: string;
  diasAtencion: any[];
  dias: any[];
  success: boolean;
  successText: string;

  constructor(private service: SistemaGeneralService) {
    this.configuracion = new Configuracion();
    this.prevconfiguracion = new Configuracion();
    this.loading = Path.loading;
    this.edit = true;
    this.load = true;
    this.saving = false;
    this.btn = 'Editar';
    this.success = false;
    this.empty = false;
    this.diasAtencion = [];
    this.dias = [
      { id: 0, dia: 'Lunes', activo: false },
      { id: 1, dia: 'Martes', activo: false },
      { id: 2, dia: 'Miércoles', activo: false },
      { id: 3, dia: 'Jueves', activo: false },
      { id: 4, dia: 'Viernes', activo: false },
      { id: 5, dia: 'Sábado', activo: false },
      { id: 6, dia: 'Domingo', activo: false },
    ];
  }

  ngOnInit() {
    this.getConfiguracionParametros();
    this.btn = 'Editar';
  }

  getConfiguracionParametros() {
    this.service.getConfiguracionParametros().subscribe(data => {
      if (data != null) {
        this.load = false;
        this.configuracion.setParametros(data);
        this.prevconfiguracion.setParametros(this.configuracion);
        this.getDiasAtencion();
        this.mostrarDiasAtencion();
      }
    });
  }

  guardarCambios() {
    this.load = true;
    this.configuracion.dias_atencion = this.diasEnAtencion();
    console.log(this.configuracion);
    this.service.actualizarParametrosSistemaGeneral(this.configuracion).subscribe(data => {
      this.load = false;
      this.successText = Mensaje.successText;
      this.success = true;
      this.btn = 'Editar';
      this.edit = true;
    });
  }

  diasEnAtencion() {
    const size = this.dias.length;
    let i = 0;
    let aux = '';
    while (i < size) {
      if (this.dias[i].activo === true) {
        aux = aux + this.dias[i].dia;
        if (i < this.dias.length - 1) {
           aux = aux + ',';
        }
      }
      i++;
    }
    return aux;
  }

  getDiasAtencion() {
    this.diasAtencion = this.configuracion.getDiasAtencion();
  }

  editar() {
    this.edit = !this.edit;
    this.success = false;
    this.btn = 'Guardar';
  }

  mostrarDiasAtencion() {
    const size = this.diasAtencion.length;
    let i = 0;
    while (i < size) {
      switch (this.diasAtencion[i]) {
        case 'Lunes':
          this.activarDia(0);
          break;
        case 'Martes':
          this.activarDia(1);
          break;
        case 'Miércoles':
          this.activarDia(2);
          break;
        case 'Jueves':
          this.activarDia(3);
          break;
        case 'Viernes':
          this.activarDia(4);
          break;
        case 'Sábado':
          this.activarDia(5);
          break;
        case 'Domingo':
          this.activarDia(6);
          break;
      }
      i++;
    }
  }

  activarDia(id: number) {
   this.dias[id].activo = !this.dias[id].activo;
  }

  cancelar() {
    this.configuracion.setParametros(this.prevconfiguracion);
    this.btn = 'Editar';
    this.edit = !this.edit;
    this.empty = false;
  }

}
