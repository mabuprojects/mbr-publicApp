import {Component, OnInit, EventEmitter, Input} from "@angular/core";
import {MaterializeAction} from "angular2-materialize/dist";
import {CartService} from "../../services/cart/cart.service";
import {Restaurant} from "../../model/restaurant/restaurant.component";
import {ProductService} from "../../services/product.service";
import {RestaurantService} from "../../services/restaurant.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";


@Component({
  selector: 'app-select-restaurant-modal',
  templateUrl: 'select-restaurant-modal.component.html'
})
export class SelectRestaurantModalComponent implements OnInit {

  pcForm: FormGroup;
  restaurants: Restaurant[];
  restaurantsBackup: Restaurant[];
  error = false;
  postalCodeTranslation: string;
  errorMessage = '';


  @Input() show: boolean;


  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private translateService: TranslateService, private router: Router, private fb: FormBuilder, private restaurantService: RestaurantService, private cartService: CartService, private productService: ProductService) {
    this.translateService.get('select-restaurant-modal.postalCode').subscribe(msg => this.postalCodeTranslation = msg);
    this.restaurantService.getRestaurantsObservable().subscribe(rs => {
      this.restaurants = rs;
      this.restaurantsBackup = rs
    });
  }

  ngOnInit() {
    this.restaurantService.getRestaurants(false);

    this.pcForm = this.fb.group({
      pc: ['', Validators.required]
    });
    this.pcForm.valueChanges.subscribe(value => this.onSubmit());
  }

  initModal() {
    if (this.show) {
      this.modalActions.emit({action: "modal", params: ['open']});
    }
  }

  openModal() {
    this.modalActions.emit({action: "modal", params: ['open']});
  }

  closeModal() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }

  onSelectRestaurant(restaurant: Restaurant): void {
    this.closeModal();
    this.productService.setRestaurant(restaurant);
    this.cartService.deleteShoppingCart();
  }


  onSubmit() {
    this.error = false;

    var pc = +this.pcForm.value.pc;

    if (!pc) {
      /* Si el form esta vcio*/
      this.restaurants = this.restaurantsBackup;
    } else {
      /*Resultados posibles*/
      var restaurantsValids: Restaurant[] = new Array();
      /*Resultados totalmente correctos*/
      var restaurantsFinal: Restaurant[] = new Array();

      this.restaurants.forEach(r => {
        if (r.zipCodes.find(zip => zip === pc)) {
          restaurantsFinal.push(r);
        }
        if (r.zipCodes.find(zip => zip.toString().includes(pc.toString()))) {
          restaurantsValids.push(r);
        }
      });

      if (restaurantsFinal.length === 1) {
        this.onSelectRestaurant(restaurantsFinal[0]);
        this.router.navigate([restaurantsFinal[0].name]);

      } else if (restaurantsFinal.length < 1) {
        /*Ningún resultado final pero si posibles resultados */
        this.restaurants = restaurantsValids;

        /*Ya ha completado el cp*/
        if (pc.toString().length > 4) {
          this.restaurants = this.restaurantsBackup;
          this.error = true;
          this.translateService.get('select-restaurant-modal.noRestaurantError').subscribe(msg => this.errorMessage = msg);
        }

      } else {
        /*Más de un resultado*/
        this.restaurants = restaurantsFinal;
      }

    }
  }

}
