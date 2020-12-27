import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Reservacion } from 'src/app/domain/Reservacion';
import { Cliente } from 'src/app/domain/Cliente';
import { ReservacionDTO } from 'src/app/domain/ReservacionDTO';
import { ReservacionDTOCli } from 'src/app/domain/ReservacionDTOCli';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'etable/api/reservacion';
  }

  public crearReservacion(reservacion: Reservacion) {
 
    return this.http.post<Reservacion>(this.url + '/' + 'crearReservacion', reservacion);
  }
  public obtenerClientebyUsuario(id: number) {
    console.log("llego2");
    return this.http.get<Cliente>(this.url + '/' + 'obtenerClientebyUsuario' + '/' + id);
  }
 
  getReservacionesbyCliente(id: number) {
    return this.http.get<Reservacion[]>(this.url + '/' + 'listReservacionesbyId'+ '/' + id);
  }
  getReservacionesDTObyCliente(id: number) {
    return this.http.get<ReservacionDTO[]>(this.url + '/' + 'listReservacionesDTObyId'+ '/' + id);
  }

   public anularReservacionById(id: number) {
     return this.http.put<boolean>(this.url + '/' + 'anularReservacionById' + '/' + id, id);
   }

   public revisarReservacionById(id: number) {
    return this.http.put<boolean>(this.url + '/' + 'revisarReservacionById' + '/' + id, id);
  }
   getReservacionesDTO() {
    return this.http.get<ReservacionDTOCli[]>(this.url + '/' + 'listReservacionesDTO');
  }

}
