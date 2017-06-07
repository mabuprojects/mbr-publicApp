import {Injectable} from '@angular/core';
import {ShoppingCart} from "../../model/shopping-cart.component";
import {ProductCart} from "../../model/product-cart.component";
import {ReplaySubject, Observable} from "rxjs";
import {GoogleAnalyicsEventsService} from "../google-analyics-events.service";

@Injectable()
export class CartService {

  shoppingCart: ShoppingCart;
  itemsNumberObservable: ReplaySubject<number>;

  constructor(private googleAnalytics :GoogleAnalyicsEventsService) {
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
    this.googleAnalytics.addProductEvent(productCart.id.toString(), productCart.name, productCart.quantity);
    this.getShoppingCart().products.push(productCart);
    this.emitItemsNumberObservable();
  }

  deleteProduct(index: number) {
    var productCart = this.shoppingCart.products.pop();
    debugger;
    this.googleAnalytics.removeProductEvent(productCart.id.toString(), productCart.name, productCart.quantity);
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
