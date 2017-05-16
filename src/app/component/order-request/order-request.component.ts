import {Component, OnInit} from "@angular/core";
import {ShoppingCart} from "../../model/shopping-cart.component";
import {ConfigService} from "../../services/configuration/config.service";
import {CartService} from "../../services/cart/cart.service";

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.scss']
})
export class OrderRequestComponent implements OnInit {

  cart: ShoppingCart;
  totalPrice: number;
  urlImage: string;

  constructor(private cartService: CartService, private config: ConfigService) {
    this.urlImage = this.config.getUrl("productImage");
    this.cart = this.cartService.getShoppingCart();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  ngOnInit() {

  }

}
