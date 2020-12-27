import { UserState } from './UserState';
import { Router } from '@angular/router';
import { User } from 'src/app/domain/User';
import { UsuarioService } from 'src/app/services/administracion/administracion-usuarios/usuarios.service';
import Swal from 'sweetalert2';

export class UnactivatedState implements UserState { 

    constructor( private router: Router , private serviceUser: UsuarioService) {
    }
    setAuthentication(password, user) {
    const passwordHash = user.password;
    user.password = password;
    const us = new User();
      us.nickname = user.nickname;
      us.password = passwordHash;

      this.serviceUser.getUsuarioByAuthentication(us).subscribe(data => {
      this.openDialog(data);
      });
    
    }

    public openDialog(data: User) {
        Swal.fire({
         icon: 'error',
         title: 'Usuario Bloqueado',
         text: ''+ data.usnombres +" "+ data.usapellidos + " se encuentra deshabilitado del sistema",
         
       })
     
     }
}