import { Injectable } from '@angular/core';
import { PerfilMesa } from 'src/app/domain/PerfilMesa';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilMesasService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'etable/api/perfilMesa';
  }

  getPerfilesMesa() {
    return this.http.get<PerfilMesa[]>(this.url + '/' + 'listPerfilMesas');
  }

  public crearPerfilMesa (perfilMesa: PerfilMesa) {
    return this.http.post<PerfilMesa>(this.url + '/' + 'crearPerfilMesa', perfilMesa);
  }

  public getPerfilMesaById(id: number) {
    return this.http.get<PerfilMesa>(this.url + '/' + 'obtenerPerfilMesa' + '/' + id);
  }
  public deletePerfilMesaById(id: number) {
    return this.http.delete<boolean>(this.url + '/' + 'eliminarPerfilMesaById' + '/' + id);
  }

   public editarPerfilMesaById(perfilMesa: PerfilMesa,id: number) {
    return this.http.put<PerfilMesa>(this.url + '/' + 'actualizarPerfilMesaById'+ '/' + id, perfilMesa);
  }
}
