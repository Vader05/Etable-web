import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem, MenuSubItem } from 'src/app/domain/MainMenu';

@Injectable({
  providedIn: 'root'
})

export class MainMenuService {
    public url: string;

    constructor(private http: HttpClient) {
      this.url = 'etable/api/mainMenu';
    }

    getListMenuItems() {
        return this.http.get<MenuItem[]>(this.url + '/' + 'listMenuItems');
    }

    getListMenuSubItems() {
        return this.http.get<MenuSubItem[]>(this.url + '/' + 'listMenuSubItems');
    }

    getListMenuSubItemsByItem(id: number) {
        return this.http.get<MenuSubItem[]>(this.url + '/' + 'listMenuSubItems' + '/' + id);
    }

    getAccesoByTipoUsuario(id: number){
      return this.http.get<MenuItem[]>(this.url + '/' + 'listMenuItems' + '/' + 'acceso' + '/' + id);
    }
}
