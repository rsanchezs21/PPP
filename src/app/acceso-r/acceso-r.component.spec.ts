import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoRComponent } from './acceso-r.component';

describe('AccesoRComponent', () => {
  let component: AccesoRComponent;
  let fixture: ComponentFixture<AccesoRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccesoRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesoRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
