import { Component, OnInit } from '@angular/core';
import { SistemaGeneralService } from 'src/app/services/administracion/sistema/sistema-general.service';
import { Configuracion } from 'src/app/domain/Configuracion';
import { Path } from 'src/app/infrastructure/constans/Path';
import { Mensaje } from 'src/app/infrastructure/constans/Mensaje';
import { ImageSelected } from 'src/app/infrastructure/plugins/ImageSelected';
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  image: ImageSelected ;
  configuracion: Configuracion;
  prevconfiguracion: Configuracion;
  load: boolean;
  edit: boolean;
  saving: boolean;
  loading: string;
  btn: string;
  empty: boolean;
  emptyText: string;
  success: boolean;
  successText: string;
  existLogo: boolean;

  constructor(private service: SistemaGeneralService) {
    this.configuracion = new Configuracion();
    this.prevconfiguracion = new Configuracion();
    this.loading = Path.loading;
    this.edit = true;
    this.load = true;
    this.saving = false;
    this.btn = 'Editar';
    this.empty = false;
    this.success = false;
    this.existLogo = false;
    this.successText = Mensaje.successText;
  }

  ngOnInit() {
    this.configuracion = new Configuracion();
    this.getConfiguracionSistemaGeneral();
  }

  getConfiguracionSistemaGeneral() {
    this.service.getConfiguracionSistemaGeneral().subscribe(data => {
      this.load = false;
      if (data != null) {
        this.configuracion.setConfiguracion(data);
        this.setExistsLogo();
        this.prevconfiguracion.setConfiguracion(this.configuracion);
        this.initConfig();
      }
    });
  }

  setExistsLogo() {
    if (this.configuracion.emplogo.length !== 0) {
      this.existLogo = true;
    } else {
      this.existLogo = false;
    }
  }

  editar() {
    this.edit = !this.edit;
    this.btn = 'Guardar';
    this.success = false;
  }


  habilitar(id: number) {
    switch (id) {
      case 1:
        this.configuracion.sist_reservacion_cliente = !this.configuracion.sist_reservacion_cliente;
        this.setValorButton(this.configuracion.sist_reservacion_cliente, 'sistreservacioncliente');
        break;
      case 2:
        this.configuracion.sist_atencion_cliente = !this.configuracion.sist_atencion_cliente;
        this.setValorButton(this.configuracion.sist_atencion_cliente, 'sistatencioncliente');
        break;
      case 3:
        this.configuracion.mesas_compuestas = !this.configuracion.mesas_compuestas;
        this.setValorButton(this.configuracion.mesas_compuestas, 'mesascompuestas');
        break;
      case 4:
        this.configuracion.reservacion_pedidos = !this.configuracion.reservacion_pedidos;
        this.setValorButton(this.configuracion.reservacion_pedidos, 'reservacionpedidos');
        break;
      case 5:
        this.configuracion.reservas_no_sesionadas = !this.configuracion.reservas_no_sesionadas;
        this.setValorButton(this.configuracion.reservas_no_sesionadas, 'reservasnosesionadas');
        break;
      case 6:
        this.configuracion.agregar_cliente_manual = !this.configuracion.agregar_cliente_manual;
        this.setValorButton(this.configuracion.agregar_cliente_manual, 'agregarclientemanual');
        break;
      case 7:
        this.configuracion.reservas_especiales = !this.configuracion.reservas_especiales;
        this.setValorButton(this.configuracion.reservas_especiales, 'reservasespeciales');
        break;
      case 8:
        this.configuracion.pagos_tarjeta_credito = !this.configuracion.pagos_tarjeta_credito;
        this.setValorButton(this.configuracion.pagos_tarjeta_credito, 'pagostarjetacredito');
        break;
    }
  }

  setValorButton(habilitado: boolean, buttonId: string) {
    const button = document.getElementById(buttonId);
    if (habilitado) {
      button.innerText = 'Habilitado';
    } else {
      button.innerText = 'Deshabilitado';
    }
  }

  initConfig() {
    this.setValorButton(this.configuracion.sist_reservacion_cliente, 'sistreservacioncliente');
    this.setValorButton(this.configuracion.sist_atencion_cliente, 'sistatencioncliente');
    this.setValorButton(this.configuracion.mesas_compuestas, 'mesascompuestas');
    this.setValorButton(this.configuracion.reservacion_pedidos, 'reservacionpedidos');
    this.setValorButton(this.configuracion.reservas_no_sesionadas, 'reservasnosesionadas');
    this.setValorButton(this.configuracion.agregar_cliente_manual, 'agregarclientemanual');
    this.setValorButton(this.configuracion.reservas_especiales, 'reservasespeciales');
    this.setValorButton(this.configuracion.pagos_tarjeta_credito, 'pagostarjetacredito');
  }

  guardarCambios() {
    if (this.camposCompletos()) {
      this.saving = true;
      this.service.actualizarConfiguracionSistemaGeneral(this.configuracion).subscribe(data => {
        this.saving = false;
        if (data != null) {
          this.success = true;
          this.empty = false;
          this.edit = !this.edit;
          this.btn = 'Editar';
        }
      });
    }
  }

  camposCompletos() {
    if (this.configuracion.empnombre.trim().length === 0) {
      this.empty = true;
      this.emptyText = 'Ingrese nombre de la empresa';
      return false;
    } else if (this.configuracion.empdescripcion.trim().length === 0) {
      this.empty = true;
      this.emptyText = 'Ingrese descripción de la empresa';
      return false;
    } else if (this.configuracion.empdireccion.trim().length === 0) {
      this.empty = true;
      this.emptyText = 'Ingrese dirección de la empresa';
      return false;
    } else if (this.configuracion.emplogo.trim().length === 0) {
      this.empty = true;
      this.emptyText = 'Ingrese el logotipo de la empresa';
      return false;
    } else if (this.configuracion.empemail.trim().length === 0) {
      this.empty = true;
      this.emptyText = 'Ingrese el e-mail de la empresa';
      return false;
    } else if (this.configuracion.empcelular.toString().length === 0) {
      this.empty = true;
      this.emptyText = 'Ingrese número celular de la empresa';
      return false;
    }
    return true;
  }

  restaurarTodo() {
    this.configuracion.empnombre = '';
    this.configuracion.empdescripcion = '';
    this.configuracion.empemail = '';
    this.configuracion.empdireccion = '';
    this.configuracion.emplogo = '';
    this.configuracion.empcelular = undefined;
    this.configuracion.sist_reservacion_cliente = false;
    this.configuracion.sist_atencion_cliente = false;
    this.configuracion.mesas_compuestas = false;
    this.configuracion.pagos_tarjeta_credito = false;
    this.configuracion.reservas_especiales = false;
    this.configuracion.reservas_no_sesionadas = false;
    this.configuracion.agregar_cliente_manual = false;
    this.configuracion.reservacion_pedidos = false;
    this.initConfig();
  }

  public cancelar() {
    this.configuracion.setConfiguracion(this.prevconfiguracion);
    this.initConfig();
    this.btn = 'Editar';
    this.edit = !this.edit;
    this.empty = false;
    this.image = null;
  }

  public onUploadFinish(event) {
    this.image = new ImageSelected();
    this.configuracion.imageByte = event.src;
    this.configuracion.imageName = event.file.name;
    this.configuracion.emplogo = this.configuracion.imageName;
    this.existLogo = false;
   }
}
