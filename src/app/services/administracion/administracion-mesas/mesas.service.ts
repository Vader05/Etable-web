import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mesa } from 'src/app/domain/Mesa';
import { MesaDTO } from 'src/app/domain/MesaDTO';
@Injectable({
  providedIn: 'root'
})
export class MesasService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'etable/api/mainMesa';
  }

  getMesas() {
    return this.http.get<MesaDTO[]>(this.url + '/' + 'listMesas');
  }

  public crearMesa(mesa: Mesa) {
    return this.http.post<Mesa>(this.url + '/' + 'crearMesa', mesa);
  }

  public getMesaById(id: number) {
    return this.http.get<Mesa>(this.url + '/' + 'obtenerMesa' + '/' + id);
  }

  public editarMesaById(mesa: Mesa,id: number) {
    return this.http.put<Mesa>(this.url + '/' + 'actualizarMesaById'+ '/' + id, mesa);
  }

  public deleteMesaById(id: number) {
    return this.http.delete<boolean>(this.url + '/' + 'eliminarMesaById' + '/' + id);
  }

}
