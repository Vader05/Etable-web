import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarExportarComponent } from './importar-exportar.component';

describe('ImportarExportarComponent', () => {
  let component: ImportarExportarComponent;
  let fixture: ComponentFixture<ImportarExportarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportarExportarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarExportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
