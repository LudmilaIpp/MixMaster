import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardadosComponent } from './guardados.component';

describe('GuardadosComponent', () => {
  let component: GuardadosComponent;
  let fixture: ComponentFixture<GuardadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
