import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadoMesa } from 'src/app/domain/EstadoMesa';

@Injectable({
  providedIn: 'root'
})
export class EstadoMesasService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'etable/api/estadoMesa';
  }

  getEstadosMesas() {
    return this.http.get<EstadoMesa[]>(this.url + '/' + 'listEstadoMesas');
  }

  public obtenerEstadoMesa(id: number) {
    return this.http.get<EstadoMesa>(this.url + '/' + 'obtenerEstadoMesa' + '/' + id);
  }


}
