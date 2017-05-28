import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart/cart.service";
import {ShoppingCart} from "../../model/shopping-cart.component";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ReuseFormComponent} from "../../shared/reuse-form/reuse-form.component";
import {AddressFormComponent} from "../../shared/address-form/address-form.component";
import {Client} from "../../model/user/client.component";
import {Address} from "../../model/address.component";
import {ClientService} from "../../services/client.service";
import {OrderService} from "../../services/order.service";
import {ProductService} from "../../services/product.service";
import {OrderRequest} from "../../model/order/order-request.component";
import {OrderLineRequest} from "../../model/order/order-line-request.component";
import {OrderLinePriceRequest} from "../../model/order/order-line-price-request.component";
import {TranslateService} from "@ngx-translate/core";
import {Restaurant} from "../../model/restaurant/restaurant.component";


@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent extends ReuseFormComponent implements OnInit {

  hideAddress: boolean = true;
  buttonDisabled: boolean = false;
  restaurant: Restaurant;
  client: Client;
  cart: ShoppingCart;
  address: Address;
  addressString: String = "";
  totalPrice: number;
  orderForm: FormGroup;
  error = false;
  errorMessage = '';

  @ViewChild(AddressFormComponent)
  private addressForm: AddressFormComponent;


  services = ['DELIVERY', 'TAKE_AWAY'];

  constructor(private cartService: CartService,
              private clientService: ClientService,
              private orderService: OrderService,
              private translateService: TranslateService,
              private fb: FormBuilder,
              private productService: ProductService,
              private router: Router) {
    super();
    /*Si no tengo productos no tiene sentido entrar*/
    if (this.cartService.getItemsNumber() < 1) {
      this.router.navigate(['/']);
    }
    this.restaurant = this.productService.getRestaurant();
  }


  ngOnInit() {
    this.cart = this.cartService.getShoppingCart();
    this.totalPrice = this.cartService.getTotalPrice();

    this.clientService.getClientDetails().subscribe(client => {
      this.client = client;
      this.address = client.address;
      this.addressString = this.getAddressFormated(client.address);
    });


    this.createForm();
  }

  createForm() {
    this.orderForm = this.fb.group({
      note: "",
      serviceType: [null, Validators.required],
    });
  }

  createOrder() {
    var orderRequest = this.getOrderRequest(this.orderForm.value);
    var zipcodeValid = false;

    /* Compruebo si el zip code esta en el restaurante*/
    if (orderRequest.serviceType === 'DELIVERY') {
      if (!this.address) {
        this.hideAddress = false;
        return;
      }
      this.productService.getRestaurant().zipCodes.forEach(zipcode => {
        if (zipcode.toString() === orderRequest.address.postalCode) {
          zipcodeValid = true;
        }
      });
    } else {
      /*Si el servicio es diferente de Delivery, no es necesaria la comprobación del zipCode*/
      zipcodeValid = true;
    }

    if (zipcodeValid) {
      this.buttonDisabled = true;
      this.orderService.createOrder(orderRequest).subscribe(
        order => {
          if (order) {
            this.router.navigate(['/stripe', order.id]);
            this.cartService.deleteShoppingCart();
            this.buttonDisabled = false;
          }
        },
        (err) => {
          this.buttonDisabled = false;
          this.error = true;
          this.translateService.get('exceptions.' + err.id).subscribe(msg => this.errorMessage = msg);
        });
    } else {
      this.error = true;
      this.translateService.get('exceptions.408').subscribe(msg => this.errorMessage = msg);
    }

  }

  getOrderRequest(orderValue): OrderRequest {
    var orderRequest = new OrderRequest(this.address, this.productService.getRestaurant().id,
      orderValue.serviceType, false, orderValue.note);


    this.cart.products.forEach(productCart => {
      var ol = new OrderLineRequest(productCart.id, productCart.quantity);

      productCart.options.forEach(option => {
        var olpr = new OrderLinePriceRequest();
        olpr.id = option.optionLinePriceId;
        ol.orderLinePrices.push(olpr);
      });

      orderRequest.orderLines.push(ol);
    });

    return orderRequest;
  }

  onBack(newAddress: Address) {
    this.openAddressForm();
    if (newAddress) {
      this.address = newAddress;
      this.addressString = this.getAddressFormated(this.address);
    }
  }


  openAddressForm() {
    this.hideAddress = !this.hideAddress;
    this.addressForm.initComponent(this.address, "ORDER");
  }

}
