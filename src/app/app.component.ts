import { Component, ChangeDetectorRef, OnInit, DoCheck } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit, DoCheck {
  activeMisReservas: boolean;
  activeReservarMesa: boolean;
  authentication: boolean;
  register: boolean;
  esCliente: boolean;
  navOpen: boolean;
  title: string;
  public date: number;
  public version: string;
  mobile: MediaQueryList;
  mobileListener: () => void;

  ngOnInit() {
    this.navOpen = false;
    const auth = localStorage.getItem('authentication');
    this.getAuth(auth);
  }

  ngDoCheck() {
    this.title = localStorage.getItem('title');
    const auth = localStorage.getItem('authentication');
    this.getAuth(auth);
  }

  getAuth(auth: string) {
    if (auth === 'true') {
      this.authentication = true;
      if (localStorage.getItem('esCliente') === 'true') {
        this.esCliente = true;
      } else {
        this.esCliente = false;
      }
    } else {
      this.authentication = false;
    }
  }

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.title = 'eTable - Reservaciones';
    this.authentication = false;
    this.esCliente = false;
    this.date = Date.now();
    this.version = 'Versión 1.0.0';
    this.mobile = media.matchMedia('(max-width: 500px)');
    this.mobileListener = () => changeDetectorRef.detectChanges();
    this.mobile.addListener(this.mobileListener);
    this.activeMisReservas = false;
    this.activeReservarMesa = false;
  }

  ngOnDestroy(): void {
    this.mobile.removeListener(this.mobileListener);
  }

  cleanTitle(){
    localStorage.removeItem('title');
  }

  logout() {
    this.navOpen = false;
    localStorage.clear();
    this.authentication = false;
    this.router.navigate(['/']);
  }

  nothing() {
    if (this.authentication) {
      this.navOpen = false;
    }
  }

  navOpenClose() {
    if (this.authentication) {
      this.navOpen = !this.navOpen;
    }
  }

  public reservar() {
    this.navigateReservar();
  }
  public misReservas() {
    this.navigateMisReservas();
  }


  private navigateReservar() {
    this.activeMisReservas= false;
    this.activeReservarMesa = true;
    this.router.navigate(['clientes/reservar']);
  }
  private navigateMisReservas() {
    this.activeMisReservas= true;
    this.activeReservarMesa = false;
    this.router.navigate(['clientes/misReservas']);
  }
}
