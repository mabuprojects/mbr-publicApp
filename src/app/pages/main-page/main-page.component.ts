import {Component, OnInit, EventEmitter, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MaterializeAction} from "angular2-materialize/dist";
import {ProductService} from "../../services/product.service";
import {Restaurant} from "../../model/restaurant/restaurant.component";
import {Product} from "../../model/product.component";
import {RestaurantService} from "../../services/restaurant.service";
import {FilterProductsModalComponent} from "../../modal/filter-products-modal/filter-products-modal.component";


@Component({
  selector: 'app-main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  products: Product[];
  restaurant: Observable<Restaurant>;
  restaurants: Observable<Restaurant[]>;
  categoryIdFilter: number | null = null;
  restaurantName: string;

  modalActions = new EventEmitter<string|MaterializeAction>();


  @ViewChild(FilterProductsModalComponent)
  private filterModal: FilterProductsModalComponent;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private restaurantService: RestaurantService,) {
    /*He hecho esto porque sino fallaba al unir el async con mi pipe de filterbyCategory*/
    this.productService.getProductsRestaurantObservable().subscribe(ps => {
      this.products = ps
    });
    this.restaurant = this.restaurantService.getRestaurantObservable();
    this.restaurants = this.restaurantService.getRestaurantsObservable();


  }

  ngOnInit() {
    this.restaurantService.getRestaurants(false);

    this.route.params.subscribe(params => {
      this.restaurantName = params['restaurantName'];

      //Si recibo un restaurante como parametro muestro sus productos
      if (this.restaurantName) {
        //Seteo el restaurante como el predeterminado y esto provoca que se actualize this.products
        //con los producots correspondientes
        this.restaurant.subscribe(restaurant => {
          this.productService.setRestaurant(restaurant)
        });
        this.restaurantService.getRestaurantByName(this.restaurantName, false);
      } else {
        //Si no recibo ningun restaurante como parámetro, muestro los productos del primero
        this.restaurants.subscribe(rs => this.productService.getFilterProductsByRestaurant(rs[0].id, false));
      }

    });

  }

  setCategoryId(categoryId: number | null) {
    this.categoryIdFilter = categoryId;
  }

  activateFilterProductsModal() {
    this.filterModal.openModal();
  }

  get showChangeRestaurantModal() {
    if (this.restaurantName) {
      return false;
    } else {
      return true;
    }
  }

}
