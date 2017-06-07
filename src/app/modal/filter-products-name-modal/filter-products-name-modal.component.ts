import {Component, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";
import {ProductNameFilterComponent} from "../../component/product-name-filter/product-name-filter.component";

@Component({
  selector: 'app-filter-products-name-modal',
  templateUrl: './filter-products-name-modal.component.html',
  styleUrls: ['./filter-products-name-modal.component.scss']
})
export class FilterProductsNameModalComponent implements OnInit {

  @Output() productNameFilter = new EventEmitter<string | null>();
  modalActions = new EventEmitter<string|MaterializeAction>();

  filterActive: boolean = false;

  @ViewChild(ProductNameFilterComponent)
  private productNameFilterComponent: ProductNameFilterComponent;

  constructor() { }

  ngOnInit() {
  }


  setProductNameFilter(productName: string | null) {
    this.productNameFilter.emit(productName);
    if (productName) {
      this.filterActive = true;
    } else {
      this.filterActive = false;
    }
  }

  openModal() {
    if (this.filterActive) {
      this.filterActive = false;
      this.productNameFilterComponent.deleteFilter();
      this.productNameFilter.emit(null);
    } else {
      this.modalActions.emit({action: "modal", params: ['open']});
    }

  }

  closeModal() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }


}
