import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/eTable-autenticacion/login/login.component';
import { UsuariosComponent } from './components/eTable-administracion/main/administracion-usuarios/usuarios/usuarios.component';
import { MainComponent } from './components/eTable-administracion/main/main.component';

// tslint:disable-next-line: max-line-length
import { CrearUsuarioComponent } from './components/eTable-administracion/main/administracion-usuarios/usuarios/crear-usuario/crear-usuario.component';
import { GeneralComponent } from './components/eTable-administracion/main/administracion-sistema/general/general.component';
import { ConfiguracionComponent } from './components/eTable-administracion/main/administracion-sistema/configuracion/configuracion.component';
import { TiposUsuarioComponent } from './components/eTable-administracion/main/administracion-usuarios/tipos-usuario/tipos-usuario.component';
import { PermisosComponent } from './components/eTable-administracion/main/administracion-usuarios/permisos/permisos.component';
import { MesaComponent } from './components/eTable-administracion/main/administracion-mesas/mesas/mesas.component';
import { CreateMesaComponent } from './components/eTable-administracion/main/administracion-mesas/mesas/create-mesa/create-mesa.component';
import { PerfilMesaComponent } from './components/eTable-administracion/main/administracion-mesas/perfil-mesa/perfil-mesa.component';
import { ProgramacionMesaComponent } from './components/eTable-administracion/main/administracion-mesas/programacion-mesa/programacion-mesa.component';
import { ClientesComponent } from './components/eTable-administracion/main/administracion-clientes/clientes/clientes.component';
import { TipoClientesComponent } from './components/eTable-administracion/main/administracion-clientes/tipo-clientes/tipo-clientes.component';
import { HistorialClienteComponent } from './components/eTable-administracion/main/administracion-clientes/historial-cliente/historial-cliente.component';
import { ReservacionesComponent } from './components/eTable-administracion/main/dashboard/reservaciones/reservaciones.component';
import { ImportarExportarComponent } from './components/eTable-administracion/main/reportes/importar-exportar/importar-exportar.component';
import { CreatePerfilMesaComponent } from './components/eTable-administracion/main/administracion-mesas/perfil-mesa/create-perfil-mesa/create-perfil-mesa.component';
import { EditarPermisoComponent } from './components/eTable-administracion/main/administracion-usuarios/permisos/editar-permiso/editar-permiso.component';
import { CrearTipoUsuarioComponent } from './components/eTable-administracion/main/administracion-usuarios/tipos-usuario/crear-tipo-usuario/crear-tipo-usuario.component';
import { RegisterComponent } from './components/eTable-autenticacion/register/register.component';
import { EditarUsuarioComponent } from './components/eTable-administracion/main/administracion-usuarios/usuarios/editar-usuario/editar-usuario.component';
// import { MatDialogModule } from '@angular/material/dialog';
import { EditarPerfilMesaComponent } from './components/eTable-administracion/main/administracion-mesas/perfil-mesa/editar-perfil-mesa/editar-perfil-mesa.component';
import { EditarMesaComponent } from './components/eTable-administracion/main/administracion-mesas/mesas/editar-mesa/editar-mesa.component';
import { ClienteReservarComponent } from './components/eTable-cliente/cliente-reservar/cliente-reservar.component';
import { ClienteMisReservasComponent } from './components/eTable-cliente/cliente-mis-reservas/cliente-mis-reservas.component';
import { CrearClienteComponent } from './components/eTable-administracion/main/administracion-clientes/clientes/crear-cliente/crear-cliente.component';
// import { NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  { path: 'eTable', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'eTable', pathMatch: 'full' },
  { path: 'sistema/general', component: GeneralComponent},
  { path: 'sistema/configuracion', component: ConfiguracionComponent},

  { path: 'usuarios/permisos', component: PermisosComponent},
  { path: 'usuarios/permisos/editar', component: EditarPermisoComponent},
  { path: 'usuarios/tipos', component: TiposUsuarioComponent},
  { path: 'usuarios/tipos/crear', component: CrearTipoUsuarioComponent},
  { path: 'usuarios/list', component: UsuariosComponent},
  { path: 'usuarios/crear', component: CrearUsuarioComponent},
  { path: 'usuarios/editar/:id', component: EditarUsuarioComponent},

  { path: 'mesas/list', component: MesaComponent},
  { path: 'mesas/crear', component: CreateMesaComponent},
  { path: 'mesas/editar/:id', component: EditarMesaComponent},
  { path: 'mesas/perfiles', component: PerfilMesaComponent},
  { path: 'mesas/perfiles/crear', component: CreatePerfilMesaComponent},
  { path: 'mesas/perfiles/editar/:id', component: EditarPerfilMesaComponent},
  { path: 'mesas/programacion', component: ProgramacionMesaComponent},

  { path: 'clientes/list', component: ClientesComponent},
  { path: 'clientes/crear', component: CrearClienteComponent},
  { path: 'clientes/tipos', component: TipoClientesComponent},
  { path: 'clientes/historial', component: HistorialClienteComponent},
  { path: 'clientes/reservar', component: ClienteReservarComponent},
  { path: 'clientes/misReservas', component: ClienteMisReservasComponent},

  { path: 'dashboard/reservaciones', component: ReservacionesComponent},

  { path: 'reportes/importar-exportar', component: ImportarExportarComponent},
  { path: 'main', component: MainComponent}

];

@NgModule({
  imports: [BrowserAnimationsModule, RouterModule.forRoot(routes, {useHash: true}), MatSidenavModule],
  exports: [RouterModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule]
})
export class AppRoutingModule { }
