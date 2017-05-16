import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {Category} from "../../model/category.component";

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.scss']
})
export class CategoriesFilterComponent implements OnInit {

  categoryIdFilter: number | null = null;
  @Output() categoryId = new EventEmitter<number | null>();
  categories: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {
    this.categories = this.categoryService.getCategoriesObservable();
  }

  ngOnInit() {
    this.categoryService.getCategories(false);
  }

  filterByCategory(categoryId: number) {
    //Si esta seleccionado lo deselecciono
    if (this.categoryIdFilter === categoryId) {
      this.categoryIdFilter = null;

    } else {
      //Si no es el que esta seleccionado, lo selecciono
      this.categoryIdFilter = categoryId;
    }

    this.categoryId.emit(this.categoryIdFilter);
  }

  deleteFilter() {
    this.categoryIdFilter = null;
  }

}
