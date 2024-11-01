import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCoctelesComponent } from './lista-cocteles.component';

describe('ListaCoctelesComponent', () => {
  let component: ListaCoctelesComponent;
  let fixture: ComponentFixture<ListaCoctelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCoctelesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCoctelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
