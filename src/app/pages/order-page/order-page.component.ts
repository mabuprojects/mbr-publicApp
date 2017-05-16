import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Order} from "../../model/order/order.component";
import {OrderService} from "../../services/order.service";
import {ReuseFormComponent} from "../../shared/reuse-form/reuse-form.component";

@Component({
  selector: 'app-order-page',
  templateUrl: 'order-page.component.html'
})
export class OrderPageComponent extends ReuseFormComponent implements OnInit {

  orders: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    super();
    this.orders = orderService.getOrdersObservable();
  }

  ngOnInit() {
    this.orderService.getOrdersByClient(true);
  }


}
