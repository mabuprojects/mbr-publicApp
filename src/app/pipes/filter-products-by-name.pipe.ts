import {Pipe, PipeTransform} from '@angular/core';
import {Product} from "../model/product.component";

@Pipe({
  name: 'filterProductsByName'
})
export class FilterProductsByNamePipe implements PipeTransform {


  transform(products: Product[], name: string): Product[] {
    if (!products) {
      return null;
    } else if (!name) {
      return products;
    } else {
      return products.filter(product => product.name.toUpperCase().includes(name.toUpperCase()));
    }

  }

}
