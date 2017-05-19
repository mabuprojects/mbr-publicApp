import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {RestaurantService} from "../../../services/restaurant.service";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../model/order/order.component";
import {ConfigService} from "../../../services/configuration/config.service";
import {ReuseFormComponent} from "../../../shared/reuse-form/reuse-form.component";
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent extends ReuseFormComponent implements OnInit {

  orderId: number;
  order: Order;
  urlImage: string;


  constructor(private route: ActivatedRoute,
              private cartService: ProductService,
              private restaurantService: RestaurantService,
              private fb: FormBuilder,
              private router: Router,
              private config: ConfigService,
              private orderService: OrderService,
              private productService: ProductService) {
    super();
    this.urlImage = this.config.getUrl("productImage");
  }

  ngOnInit() {
    this.order = new Order();
    this.route.params.subscribe(params => {
      this.orderId = +params['orderId'];
    });
    this.orderService.getOrderObservable().subscribe(o => this.order = o);
    this.orderService.findOrderById(this.orderId, false);

  }


}
