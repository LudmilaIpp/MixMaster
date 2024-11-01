import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonRandomComponent } from './boton-random.component';

describe('BotonRandomComponent', () => {
  let component: BotonRandomComponent;
  let fixture: ComponentFixture<BotonRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonRandomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
