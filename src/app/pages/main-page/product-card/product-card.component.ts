import {Component, OnInit, Input} from '@angular/core';
import {Product} from "../../../model/product.component";
import {ConfigService} from "../../../services/configuration/config.service";


@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html'
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  urlImage: string;


  constructor(private config: ConfigService) {
  }

  ngOnInit() {
    this.urlImage = this.config.getUrl("productImage");
  }


}
