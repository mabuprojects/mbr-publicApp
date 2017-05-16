import {Component, OnInit, EventEmitter, Output, ViewChild} from "@angular/core";
import {MaterializeAction} from "angular2-materialize/dist";
import {CategoriesFilterComponent} from "../../component/categories-filter/categories-filter.component";

@Component({
  selector: 'app-filter-products-modal',
  templateUrl: 'filter-products-modal.component.html',
  styleUrls: ['filter-products-modal.component.scss']
})
export class FilterProductsModalComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();

  @Output() categoryId = new EventEmitter<number | null>();

  filterActive: boolean = false;

  @ViewChild(CategoriesFilterComponent)
  private filterComponent: CategoriesFilterComponent;

  constructor() {
  }

  ngOnInit() {
  }

  setCategoryId(categoryId: number | null) {
    this.categoryId.emit(categoryId);
    if (categoryId) {
      this.filterActive = true;
    } else {
      this.filterActive = false;
    }
    this.closeModal();
  }

  openModal() {
    if (this.filterActive) {
      this.filterActive = false;
      this.filterComponent.deleteFilter();
      this.categoryId.emit(null);
    } else {
      this.modalActions.emit({action: "modal", params: ['open']});
    }

  }

  closeModal() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }

}
