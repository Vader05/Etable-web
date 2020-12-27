import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoClientesComponent } from './tipo-clientes.component';

describe('TipoClientesComponent', () => {
  let component: TipoClientesComponent;
  let fixture: ComponentFixture<TipoClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
