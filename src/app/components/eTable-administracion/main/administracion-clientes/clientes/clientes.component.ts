import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/administracion/administracion-clientes/clientes.service';
import { Cliente } from 'src/app/domain/Cliente';
import { Router } from '@angular/router';
import { Path } from 'src/app/infrastructure/constans/Path';
import { MatDialog } from '@angular/material/dialog';
import { EliminarClienteComponent } from 'src/app/components/eTable-modals/cliente/eliminar/eliminar-cliente';
import { EditarClienteComponent } from 'src/app/components/eTable-modals/cliente/editar/editar-cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: []
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[];
  load: boolean;
  loading: string;
  sinClientes: boolean;

  constructor(
    private router: Router,
    private service: ClientService,
    private dialog: MatDialog) {
      this.sinClientes = true;
      this.load = true;
      this.loading = Path.loading;
  }

  ngOnInit() {
    this.getClientes();
  }

  private getClientes() {
    this.service.getClientes().subscribe(data => {
      if (data.length === 0) {
        this.sinClientes = true;
      } else {
        this.sinClientes = false;
      }
      this.load = false;
      this.clientes = data;
    });
  }

  public editCliente(id: number) {
    this.openDialogEdit(id);
  }

  public deleteCliente(id: number) {
    this.openDialogDelete(id);
  }

  public nuevo() {
    this.router.navigate(['clientes/crear']);
  }

  public openDialogDelete(id: number) {
    const dialogRef = this.dialog.open(EliminarClienteComponent, {
      width: '250px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load = true;
      this.getClientes();
    });
  }

  public openDialogEdit(id: number) {
    const dialogRef = this.dialog.open(EditarClienteComponent, {
      width: '550px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load = true;
      this.getClientes();
    });
  }
}
