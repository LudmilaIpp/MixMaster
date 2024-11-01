import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaCoctelComponent } from './carta-coctel.component';

describe('CartaCoctelComponent', () => {
  let component: CartaCoctelComponent;
  let fixture: ComponentFixture<CartaCoctelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaCoctelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaCoctelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
