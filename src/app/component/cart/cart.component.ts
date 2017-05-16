import {Component, OnInit, EventEmitter} from "@angular/core";
import {ShoppingCart} from "../../model/shopping-cart.component";
import {CartService} from "../../services/cart/cart.service";
import {Router} from "@angular/router";
import {MaterializeAction} from "angular2-materialize/dist";
import {AuthenticationService} from "../../services/authentication.service";
import {ConfigService} from "../../services/configuration/config.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: ShoppingCart;
  totalPrice: number;
  urlImage: string;
  toastActions = new EventEmitter<string|MaterializeAction>();

  constructor(private cartService: CartService, private config: ConfigService, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.urlImage = this.config.getUrl("productImage");
    this.cart = this.cartService.getShoppingCart();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  deleteItem(index: number) {
    this.cart = this.cartService.deleteProduct(index);
    this.totalPrice = this.cartService.getTotalPrice();
    this.toastActions.emit('toast');
  }

  redirectToPayment() {
      this.router.navigate(['payment']);
  }
}
