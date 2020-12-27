import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoUsuario } from 'src/app/domain/TipoUsuario';
import { TipoUsuarioPermiso } from 'src/app/domain/TipoUsuarioPermiso';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'etable/api/usuarios';
  }

  getTiposUsuario() {
    return this.http.get<TipoUsuario[]>(this.url + '/' + 'tipoUsuario' + '/' + 'list');
  }

  actualizarTipoUsuario(tipoUsuario: TipoUsuario) {
    return this.http.put<TipoUsuario>(this.url + '/' + 'tipoUsuario' + '/' + 'editarTipoUsuario', tipoUsuario);
  }

  getTipoUsuarioById(id: number) {
    return this.http.get<TipoUsuario>(this.url + '/' + 'tipoUsuario' + '/' + id);
  }

  crearTipoUsuario(tipoUsuario: TipoUsuario) {
    return this.http.post<TipoUsuario>(this.url + '/' + 'tipoUsuario' + '/' + 'agregarTipoUsuario', tipoUsuario);
  }

  asignarPermisos(list: TipoUsuarioPermiso[]) {
    return this.http.post<boolean>(this.url + '/' + 'tipoUsuarioPermiso' + '/' +
    'asignarPermisos', list);
  }

  removerPermisos(list: TipoUsuarioPermiso[]) {
    return this.http.post<boolean>(this.url + '/' + 'tipoUsuarioPermiso' + '/' +
    'removerPermisos', list);
  }

  getPermisosAsigadosDeTipoUsuario(id: number) {
    return this.http.get<TipoUsuarioPermiso[]>(this.url + '/' + 'tipoUsuarioPermiso' +
     '/' + id);
  }

  eliminarTipoUsuario(tipousuarioId: number) {
    return this.http.delete<boolean>(this.url + '/' + 'tipoUsuario' + '/' + 'eliminarTipoUsuario' + '/' + tipousuarioId);
  }
}
