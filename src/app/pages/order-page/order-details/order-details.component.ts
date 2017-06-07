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
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent extends ReuseFormComponent implements OnInit {

  orderId: number;
  order: Order;
  urlImage: string;
  restaurantName: string = "";


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

    this.order = new Order();

  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = +params['orderId'];

      this.orderService.findOrderById(this.orderId, true).subscribe(o => {
        this.order = o;
      });
    });
  }


}
