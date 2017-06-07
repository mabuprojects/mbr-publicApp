import {Component, OnInit, EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../services/authentication.service";
import {OrderService} from "../../services/order.service";
import {PaymentRequest} from "../../model/order/payment-request.component";
import {ConfigService} from "../../services/configuration/config.service";
import {MaterializeAction} from "angular2-materialize/dist";
import {Order} from "../../model/order/order.component";
import {ReuseFormComponent} from "../../shared/reuse-form/reuse-form.component";
import {ClientService} from "../../services/client.service";

declare var Stripe: any;

@Component({
  selector: 'app-stripe-page',
  templateUrl: './stripe-page.component.html',
  styleUrls: ['./stripe-page.component.scss']
})
export class StripePageComponent extends ReuseFormComponent implements OnInit {


  stripe = Stripe(this.config.getAppData('stripeKey'));
  toastActions = new EventEmitter<string|MaterializeAction>();
  elements = this.stripe.elements();
  card;
  last4 = "";
  orderId: number;
  order: Order;
  error = false;
  hasDefaultCard: boolean = false;
  useDefaultCard: boolean = false;
  errorMessage = '';
  paymentForm: FormGroup;
  formValid: boolean = false;
  cardFormValid: boolean = false;
  disableSubmitButton: boolean = false;


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private config: ConfigService,
              private translateService: TranslateService,
              private orderService: OrderService,
              private clientService: ClientService) {
    super();
    this.order = new Order();
    this.paymentForm = this.fb.group({savePaymentDetails: false, useDefaultCard: false});
  }


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.orderId = +params['orderId'];
      this.orderService.findOrderById(this.orderId, true).subscribe(o => {
        this.order = o;
      });
    });


    this.clientService.getClientDetails().subscribe(c => {
      if (c.stripeId) {
        this.hasDefaultCard = true;
        this.last4 = c.last4CardDigits;
      }
    });


    //If useDefaultCard form is valid (Is not necessary card form)
    this.paymentForm.controls['useDefaultCard'].valueChanges.subscribe(value => {
      if (value) {
        //Si usa la tarjeta por defecto
        this.useDefaultCard = true;
        this.formValid = true;
      } else {
        //Si no usa la tarjeta por defecto
        if (this.cardFormValid) {
          //Pero tiene metida la tarjeta y esta correcta
          this.useDefaultCard = false;
        } else {
          //No tiene correctamente relleno el formulario de la tarjeta
          this.useDefaultCard = false;
          this.formValid = false;
        }
      }
    });

    // Custom styling can be passed to options when creating an Element.
    const style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        lineHeight: '24px',
      },
    };

    // Create an instance of the card Element

    this.card = this.elements.create('card', {style, hidePostalCode: true});

    // Add an instance of the card Element into the `card-element` <div>
    this.card.mount('#card-element');

    //ADD LISTENER CHANGE TO ERRORS
    this.card.addEventListener('change', ({error}) => {
      const displayError = document.getElementById('card-errors');
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = '';
      }
    });

    //ADD LISTENER CHANGE TO COMPETE FORM
    this.card.addEventListener('change', ({complete}) => {
      const displayError = document.getElementById('card-errors');
      if (complete) {
        this.formValid = true;
        this.cardFormValid = true;
      } else {
        this.formValid = false;
        this.cardFormValid = false;
      }
    });
  }

  /**
   * Create payment
   */
  submitPayment() {
    this.disableSubmitButton = true;
    var formValue = this.paymentForm.value;
    if (formValue.useDefaultCard) {
      this.stripeTokenHandler("");
    } else {
      this.stripe.createToken(this.card).then(function (result) {
          if (result.error) {
            this.disableSubmitButton = false;
            // Inform the user if there was an error
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            this.stripeTokenHandler(result.token.id);
          }
        }.bind(this)
      );
    }


  }

  /**
   * Receive token from stripe
   * @param tokenId
   */
  stripeTokenHandler(tokenId: string) {
    var formValue = this.paymentForm.value;

    //Si uso la tarjeta por defecto no necesito guardar los datos de pago
    if (formValue.useDefaultCard){
      formValue.savePaymentDetails=false;
    }
    var paymentRequest = new PaymentRequest(this.orderId, tokenId, formValue.savePaymentDetails, formValue.useDefaultCard);
    this.orderService.payOrder(paymentRequest).subscribe(
      result => {
        if (result) {
          this.disableSubmitButton = false;
          this.toastActions.emit('toast');
          this.router.navigate(['orders',this.order.id]);
        }
      },
      (err) => {
        this.disableSubmitButton = false;
        this.error = true;
        if (err.id === 403) {
          this.translateService.get('exceptions.stripe.' + err.message).subscribe(msg => this.errorMessage = msg);
        } else {
          this.translateService.get('exceptions.' + err.id).subscribe(msg => this.errorMessage = msg);
        }

      });

  }

}
