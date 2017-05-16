import {Pipe, PipeTransform} from '@angular/core';
import {Product} from "../model/product.component";

@Pipe({
  name: 'filterProductsByCategory'
})
export class FilterProductsByCategoryPipe implements PipeTransform {


  transform(products: Product[], categoryId: number): Product[] {
    if (!products) {
      return null;
    } else if (!categoryId) {
      return products;
    } else {
      return products.filter(product => product.category.id === categoryId);
    }

  }

}
