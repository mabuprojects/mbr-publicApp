import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductsModalComponent } from './filter-products-modal.component';

describe('FilterProductsModalComponent', () => {
  let component: FilterProductsModalComponent;
  let fixture: ComponentFixture<FilterProductsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterProductsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterProductsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
