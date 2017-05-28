import {Injectable} from '@angular/core';
import {ShoppingCart} from "../../model/shopping-cart.component";
import {ProductCart} from "../../model/product-cart.component";
import {ReplaySubject, Observable} from "rxjs";

@Injectable()
export class CartService {

  shoppingCart: ShoppingCart;
  itemsNumberObservable: ReplaySubject<number>;

  constructor() {
    this.shoppingCart = new ShoppingCart();
    this.shoppingCart.products = new Array<ProductCart>();
    this.itemsNumberObservable = new ReplaySubject(1);
  }

  getShoppingCart() {
    return this.shoppingCart;
  }

  getItemsNumberObservable(): Observable<number> {
    return this.itemsNumberObservable;
  }
  getItemsNumber(): number {
    return this.shoppingCart.products.length;
  }

  emitItemsNumberObservable() {
    this.itemsNumberObservable.next(this.shoppingCart.products.length);
  }

  getTotalPrice() {
    var count: number = 0;
    this.shoppingCart.products.forEach(p => count = count + (p.totalPrice * p.quantity));
    return count;
  }

  addProduct(productCart: ProductCart) {
    this.getShoppingCart().products.push(productCart);
    this.emitItemsNumberObservable();
  }

  deleteProduct(index: number) {
    this.shoppingCart.products.splice(index, 1);
    this.emitItemsNumberObservable();
    return this.shoppingCart;
  }

  deleteShoppingCart() {
    this.shoppingCart = new ShoppingCart();
    this.shoppingCart.products = [];
    this.emitItemsNumberObservable();
  }
}
