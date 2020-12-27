import { Injectable } from '@angular/core';
import { User } from 'src/app/domain/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user: User;
  public url: string;

  constructor(private http: HttpClient) {
    this.url = 'etable/api/authentication';
  }

  findUserByNickname(nickname: string) {
    return this.http.get<User>(this.url + '/' + 'finduserbynickname' + '/' + nickname);
  }
  authenticationLogin(user: User) {
    return this.http.post<User>(this.url + '/' + 'authenticationLogin', user);
  }

}
