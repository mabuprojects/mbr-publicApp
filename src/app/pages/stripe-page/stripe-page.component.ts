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
import {Observable} from "rxjs";
import {ReuseFormComponent} from "../../shared/reuse-form/reuse-form.component";

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
  orderId: number;
  order: Observable<Order>;
  error = false;
  errorMessage = '';
  paymentForm: FormGroup;
  formValid: boolean = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private config: ConfigService,
              private translateService: TranslateService,
              private authenticationService: AuthenticationService,
              private orderService: OrderService) {
    super();
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = +params['orderId'];
      this.order = this.orderService.findOrderById(this.orderId, true);
    });

    this.paymentForm = this.fb.group({note: ""});


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
      } else {
        this.formValid = false;
      }
    });
  }

  /**
   * Create payment
   */
  submitPayment() {
    this.stripe.createToken(this.card).then(function (result) {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          this.stripeTokenHandler(result.token.id);
        }
      }.bind(this)
    );

  }

  /**
   * Receive token from stripe
   * @param tokenId
   */
  stripeTokenHandler(tokenId: string) {
    var paymentRequest = new PaymentRequest(this.orderId, tokenId, false, false);
    this.orderService.payOrder(paymentRequest).subscribe(
      result => {
        if (result) {
          this.toastActions.emit('toast');
          this.router.navigate(['orders']);
        }
      },
      (err) => {
        this.error = true;
        if (err.id === 403) {
          this.translateService.get('exceptions.stripe.' + err.message).subscribe(msg => this.errorMessage = msg);
        } else {
          this.translateService.get('exceptions.' + err.id).subscribe(msg => this.errorMessage = msg);
        }

      });

  }

}
