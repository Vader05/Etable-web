import { Component, OnInit } from '@angular/core';
import { MesasService } from 'src/app/services/administracion/administracion-mesas/mesas.service';
import { MesaDTO } from 'src/app/domain/MesaDTO';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: []
})
export class ReservacionesComponent implements OnInit {

  public mesas: MesaDTO[];
  constructor(private serviceMesa: MesasService) { }

  ngOnInit() {
    this.getMesas();
  }

  private getMesas() {
    this.serviceMesa.getMesas().subscribe(data => {
      this.mesas = data;
    });
  }

}
