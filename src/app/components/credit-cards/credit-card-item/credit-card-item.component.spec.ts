import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardItemComponent } from './credit-card-item.component';

describe('CreditCardItemComponent', () => {
  let component: CreditCardItemComponent;
  let fixture: ComponentFixture<CreditCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditCardItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
