import {Component, OnInit, EventEmitter} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {ProductCart} from "../../model/product-cart.component";
import {CartService} from "../../services/cart/cart.service";
import {MaterializeAction} from "angular2-materialize/dist";
import {Observable} from "rxjs";
import {OptionsItemCart} from "../../model/options-item-cart.component";
import {ReuseFormComponent} from "../../shared/reuse-form/reuse-form.component";
import {Product} from "../../model/product.component";
import {Restaurant} from "../../model/restaurant/restaurant.component";
import {ProductService} from "../../services/product.service";
import {RestaurantService} from "../../services/restaurant.service";
import {Option} from "../../model/option.component";
import {OptionLine} from "../../model/option-line.component";
import {ConfigService} from "../../services/configuration/config.service";
import {Taxe} from "../../model/taxe.component";
import {Category} from "../../model/category.component";


@Component({
  selector: 'app-product-page',
  templateUrl: 'product-page.component.html',
  styleUrls: ['product-page.component.scss']
})
export class ProductPageComponent extends ReuseFormComponent implements OnInit {

  productName: string;
  empty: string = "";
  product: Product;
  toastActions = new EventEmitter<string|MaterializeAction>();
  restaurant: Observable<Restaurant>;
  productCartForm: FormGroup;
  restaurantName: string;
  urlImage: string;


  /*Precio total del producto según las opciones seleccionadas*/
  actualPrice: number;

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private restaurantService: RestaurantService,
              private fb: FormBuilder,
              private config: ConfigService,
              private router: Router,
              private productService: ProductService) {
    super();
    this.restaurant = this.restaurantService.getRestaurantObservable();
  }

  ngOnInit() {
    this.product = this.createEmptyProduct();
    this.urlImage = this.config.getUrl("productImage");

    this.route.params.subscribe(params => {
      this.restaurantName = params['restaurantName'];
      this.productName = params['productName']
    });
    //Si el restaurante escogido ha cambiado
    if (this.productService.getRestaurant().name !== this.restaurantName) {
      //Seteo el restaurante como el predeterminado y esto provoca que se actualize this.products
      //con los producots correspondientes

      this.restaurant.subscribe(restaurant => this.productService.setRestaurant(restaurant));
      this.restaurantService.getRestaurantByName(this.restaurantName, false);

    }

    this.productService.getProductRestaurantByName(this.productName, false).subscribe(
      p => {
        this.product = p;
        this.actualPrice = this.product.productDetails[0].price;
        this.createForm(this.product);
        this.productCartForm.valueChanges.subscribe((valueForm) => this.formChanges(valueForm));
      });
    this.actualPrice = 0;

  }


  createForm(product: Product) {
    this.productCartForm = this.fb.group({
      quantity: [1, Validators.compose([Validators.required, this.greaterThan0])],
      options: this.fb.array(product.options.map(o => this.getOptionForm(o)))
    });
  }


  /**
   * Devueleve el formulario de cada opción, si es una opción de tipo main
   * es obligatorio que esta activada
   * @param o
   * @returns {FormGroup}
   */
  getOptionForm(o: Option) {
    if (o.main) {
      return this.fb.group({
        id: o.id,
        name: o.name,
        main: o.main,
        active: [null, Validators.required]
      });
    } else {
      return this.fb.group({
        id: o.id,
        name: o.name,
        main: o.main,
        active: [null]
      });
    }
  }

  /**
   * Se ejecuta cuando se produce algún cambio en el form
   * Actualiza el actualPrice
   * @param valueForm
   */
  formChanges(valueForm) {
    var productCart = this.getProductCart(valueForm);

    this.actualPrice = productCart.totalPrice * productCart.quantity;
    if (this.actualPrice < 0) {
      this.actualPrice = 0;
    }
  }

  /**
   *Devuelve el estado actual del producto según la cantidad y las opciones escogidas
   *
   * @param valueForm
   * @returns {ProductCart}
   */
  getProductCart(valueForm) {
    var productCart = new ProductCart(this.product.id, this.product.name, this.product.imageName, valueForm.quantity, this.product.productDetails[0].price);

    for (let option of valueForm.options) {
      if (option.active) {
        var optionLine = this.product.options.find(o => o.id === option.id).optionLines.find(ol => ol.id === +option.active);

        var optionItemCart = new OptionsItemCart(option.id, option.main, option.name, optionLine.id, optionLine.optionLinePrices[0].id, optionLine.name, optionLine.optionLinePrices[0].priceAdded);
        productCart.options.push(optionItemCart)
      }

    }
    productCart.totalPrice = this.getTotalPriceOfProductCart(this.product.productDetails[0].price, productCart.options);
    return productCart;
  }

  /**
   * Calcula el precio total del producto según sus opciones y el precio base
   * @param options
   * @returns {number}
   */
  getTotalPriceOfProductCart(originalPrice: number, options: OptionsItemCart[]) {
    var price = originalPrice;
    var priceAdded = 0;
    for (let o of options) {
      if (o.optionMain) {
        price = o.priceAdded;
      } else {
        priceAdded = priceAdded + o.priceAdded;
      }
    }
    return price + priceAdded;

  }

  onSubmit() {
    /* Añado el producto al carrito*/
    this.cartService.addProduct(this.getProductCart(this.productCartForm.value));
    this.toastActions.emit('toast');
    this.redirectToMainPage();
  }


  get options(): FormArray {
    return this.productCartForm.get('options') as FormArray;
  };


  getoptionLines(id: number): OptionLine[] {
    return this.product.options.find(o => (o.id === id)).optionLines;
  };


  redirectToMainPage() {
    var restaurant = this.productService.getRestaurant();
    if (restaurant) {
      this.router.navigate([restaurant.name]);
    } else {
      this.router.navigate(['/']);
    }
  }

  createEmptyProduct(): Product {
    var p: Product = new Product();
    p.id = null;
    p.name = "";
    p.description = "";
    p.category = new Category();
    p.category.id = null;
    p.taxe = new Taxe();
    p.taxe.id = null;
    p.options = [];
    p.productDetails = [];
    return p
  }
}

