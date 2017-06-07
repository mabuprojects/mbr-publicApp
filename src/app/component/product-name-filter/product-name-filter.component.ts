import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-product-name-filter',
  templateUrl: './product-name-filter.component.html',
  styleUrls: ['./product-name-filter.component.scss']
})
export class ProductNameFilterComponent implements OnInit {

  productNameFilterForm: FormGroup;

  productNameFilter: string | null = null;

  @Output() productName = new EventEmitter<string | null>();

  constructor(private formBuilder: FormBuilder) {
    this.productNameFilterForm = this.formBuilder.group({
      productName: [this.productNameFilter]
    });

    this.productNameFilterForm.valueChanges.subscribe(v => this.onSubmit());

  }


  ngOnInit() {
  }


  onSubmit() {
    this.productName.emit(this.productNameFilterForm.value.productName);
  }

  deleteFilter() {
    this.productNameFilterForm.controls['productName'].setValue(null);
  }
}
