import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNameFilterComponent } from './product-name-filter.component';

describe('ProductNameFilterComponent', () => {
  let component: ProductNameFilterComponent;
  let fixture: ComponentFixture<ProductNameFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNameFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNameFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
