import { UserState } from './UserState';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';

export class ActivatedState implements UserState { 

    constructor( private router: Router
        , private serviceUser: UsuarioService) {
    }
    setAuthentication(password, user) {
        const passwordHash = user.password;

        console.log("userrrr",user);
        user.password = password;

          localStorage.setItem('nickname', user.nickname);
          localStorage.setItem('password', passwordHash);
          localStorage.setItem('authentication', 'true');

         

          this.router.navigate(['main']);
          
    }
}