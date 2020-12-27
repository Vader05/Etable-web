import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from 'src/app/domain/Cliente';
import { User } from 'src/app/domain/User';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'etable/api/user';
  }

  public getClientes() {
    return this.http.get<Cliente[]>(this.url + '/' + 'clientes');
  }

  public deleteCliente(id: number) {
    return this.http.delete<boolean>(this.url + '/' + 'clientes'
    + '/' + 'deleteCliente' + '/' + id);
  }

  public editCliente(user: User, cliente: Cliente) {
    return this.http.put<Cliente>(this.url + '/' + 'clientes' + '/', {user, cliente});
  }

  public getClienteById(id: number) {
    return this.http.get<Cliente>(this.url + '/' + 'clientes' + '/' + 'obtenerCliente' + '/' + id);
  }
}
