import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permiso } from 'src/app/domain/Permiso';
import { forkJoin, Observable } from 'rxjs';
import { MenuSubItem } from 'src/app/domain/MainMenu';
import { TipoUsuarioPermiso } from 'src/app/domain/TipoUsuarioPermiso';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'etable/api/permiso';
  }

  getPermisos() {
    return this.http.get<Permiso[]>(this.url + '/' + 'permisos');
  }

  getPermisosBySubItem(id: number) {
    return this.http.get<Permiso[]>(this.url + '/' + 'listPermisosBySubItem' + '/' + id);
  }

   getPermisosBySubItemForkJoin(subitems: MenuSubItem[]): Observable<any[]> {
    const obs = [];
    subitems.forEach(value => {
      obs.push(this.http.get<Permiso[]>(this.url + '/' + 'permisosBySubItem' + '/' + value.csubitem));
    });
    return forkJoin(obs);
  }

  actualizarPermiso(permiso: Permiso) {
    return this.http.put<Permiso>(this.url + '/' + 'editarPermiso', permiso);
  }

  getPermisoById(id: number) {
    return this.http.get<Permiso>(this.url + '/' + id);
  }

  getListPermisosById(tiposuspermiso: TipoUsuarioPermiso[]) {
    return this.http.post<Permiso[]>(this.url + '/' + 'permisos' + '/' + 'tipousuario', tiposuspermiso);
  }
}
