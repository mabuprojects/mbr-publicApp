import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePageComponent } from './stripe-page.component';

describe('StripePageComponent', () => {
  let component: StripePageComponent;
  let fixture: ComponentFixture<StripePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
