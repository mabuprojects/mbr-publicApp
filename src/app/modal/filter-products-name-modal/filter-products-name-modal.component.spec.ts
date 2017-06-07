import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductsNameModalComponent } from './filter-products-name-modal.component';

describe('FilterProductsNameModalComponent', () => {
  let component: FilterProductsNameModalComponent;
  let fixture: ComponentFixture<FilterProductsNameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterProductsNameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterProductsNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
