import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoctelComponent } from './coctel.component';

describe('CoctelComponent', () => {
  let component: CoctelComponent;
  let fixture: ComponentFixture<CoctelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoctelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoctelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
