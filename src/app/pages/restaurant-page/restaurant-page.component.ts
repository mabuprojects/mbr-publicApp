import {Component, OnInit} from "@angular/core";
import {ProductService} from "../../services/product.service";
import {Restaurant} from "../../model/restaurant/restaurant.component";
import {RestaurantService} from "../../services/restaurant.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.scss']
})
export class RestaurantPageComponent implements OnInit {

  restaurantObservable: Observable<Restaurant>;
  name: string;

  constructor(private productService: ProductService, private route: ActivatedRoute, private restaurantService: RestaurantService) {
    this.restaurantObservable = this.restaurantService.getRestaurantObservable();
    this.restaurantObservable.subscribe(r => this.name = r.name);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var restaurantName = params['restaurantName'];
      if (restaurantName) {
        this.restaurantService.getRestaurantByName(restaurantName, false);
      }
    });
  }
}
