import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialClienteComponent } from './historial-cliente.component';

describe('HistorialClienteComponent', () => {
  let component: HistorialClienteComponent;
  let fixture: ComponentFixture<HistorialClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
