import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/administracion/administracion-clientes/clientes.service';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.html'
})
export class EliminarClienteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EliminarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ClientService) { }

  ngOnInit() {
  }

  delete() {
    this.service.deleteCliente(this.data).subscribe(data => {
      if (data) {
        console.log('Eliminando cliente');
      } else {
        console.log('No se pudo eliminar cliente');
      }
    });
  }
}
