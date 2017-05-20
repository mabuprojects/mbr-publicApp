import {Component, OnInit, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {MaterializeAction} from "angular2-materialize/dist";
import {CartService} from "../services/cart/cart.service";
import {AuthenticationService} from "../services/authentication.service";
import {ProductService} from "../services/product.service";
import {CategoryService} from "../services/category.service";
import {ConfigService} from "../services/configuration/config.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  autenticated: boolean;
  languages;
  restaurantName: Observable<String>;
  itemNumber: number = 0;

  toastActions = new EventEmitter<string|MaterializeAction>();

  sideNavActions = new EventEmitter<string|MaterializeAction>();

  constructor(private authenticationService: AuthenticationService,
              private productService: ProductService,
              private router: Router,
              private config: ConfigService,
              private cartService: CartService,
              private categoryService: CategoryService,
              private translateService: TranslateService) {

    this.restaurantName = this.productService.getRestaurantNameObservable();
  }

  ngOnInit() {
    this.authenticationService.isAuthenticated().subscribe(
      authStatus => {
        this.autenticated = authStatus;
      }
    );

    this.cartService.getItemsNumberObservable().subscribe(n => this.itemNumber = n);
    this.autenticated = this.authenticationService.isNowAuthenticated();
    this.languages = this.translateService.getLangs().map(lang => {
      return {value: lang, label: lang};
    });
    this.languages = [{value: "en", label: "English", flag: "us"}, {value: "es", label: "Spanish", flag: "es"}];

    this.productService.emitRestaurantNameObservable();
  }

  logOut() {
    this.authenticationService.logOut();
    this.closeSideNav();
    this.toastActions.emit('toast');
  }

  select(value) {
    this.translateService.use(value);
  }

  redirectToRestaurantPage() {
    this.closeSideNav();
    var restaurant = this.productService.getRestaurant();
    if (restaurant) {
      this.router.navigate([restaurant.name, 'info']);
    } else {
      this.router.navigate(['/']);
    }
  }


  redirectToMainPage() {
    var restaurant = this.productService.getRestaurant();
    if (restaurant) {
      this.router.navigate([restaurant.name]);
    } else {
      this.router.navigate(['/']);
    }
  }

  redirectToReservePage() {
    var restaurant = this.productService.getRestaurant();
    if (restaurant) {
      this.router.navigate([restaurant.name,'reserve']);
    } else {
      this.router.navigate(['/']);
    }
  }

  redirectToCartPage() {
    var restaurant = this.productService.getRestaurant();
    if (restaurant) {
      this.router.navigate([restaurant.name, 'cart']);
    } else {
      this.router.navigate(['/']);
    }
  }

  closeSideNav() {
    this.sideNavActions.emit({action: "sideNav", params: ['hide']});
  }

}
