import {BrowserModule} from "@angular/platform-browser";
import {NgModule, APP_INITIALIZER} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule, Http} from "@angular/http";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {ProductCardComponent} from "./pages/main-page/product-card/product-card.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {FooterComponent} from "./footer/footer.component";
import {ProductPageComponent} from "./pages/product-page/product-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {SinginComponent} from "./pages/singin-page/singin.component";
import {APP_ROUTES} from "./app.routes";
import {SingupComponent} from "./pages/singup-page/singup.component";
import {FilterProductsByCategoryPipe} from "./pipes/filter-products-by-category.pipe";
import {MaterializeModule} from "angular2-materialize/dist";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {SelectRestaurantModalComponent} from "./modal/select-restaurant-modal/select-restaurant-modal.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";
import {CartService} from "./services/cart/cart.service";
import {OrderPageComponent} from "./pages/order-page/order-page.component";
import {PaymentPageComponent} from "./pages/payment-page/payment-page.component";
import {OrderDetailsComponent} from "./pages/order-page/order-details/order-details.component";
import {StripePageComponent} from "./pages/stripe-page/stripe-page.component";
import {AddressFormComponent} from "./shared/address-form/address-form.component";
import {MaterializeInputDirective} from "./shared/materialize-input/materialize-input.directive";
import {AuthenticationService} from "./services/authentication.service";
import {OrderService} from "./services/order.service";
import {ClientService} from "./services/client.service";
import {UserRegisterService} from "./services/user-register.service";
import {ProductService} from "./services/product.service";
import {RestaurantService} from "./services/restaurant.service";
import {CategoryService} from "./services/category.service";
import {ConfigService} from "./services/configuration/config.service";
import {ErrorCardComponent} from "./shared/error-card/error-card.component";
import {WebClientService} from "./services/web-client.service";
import {DataAppDirective} from "./shared/directives/data-app.directive";
import {StyleAppDirective} from "./shared/directives/style-app.directive";
import {CategoriesFilterComponent} from "./component/categories-filter/categories-filter.component";
import {CartComponent} from "./component/cart/cart.component";
import {RestaurantPageComponent} from "./pages/restaurant-page/restaurant-page.component";
import {AgmCoreModule} from "@agm/core";
import {AuthGuard} from "./shared/auth-guard.service";
import {FilterProductsModalComponent} from "./modal/filter-products-modal/filter-products-modal.component";
import {RestaurantComponent} from "./component/restaurant/restaurant.component";
import {OrderRequestComponent} from "./component/order-request/order-request.component";
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initConfig(config: ConfigService) {
  return () => config.load()
}

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    MainPageComponent,
    NavBarComponent,
    FooterComponent,
    ProductPageComponent,
    ProfilePageComponent,
    SinginComponent,
    SingupComponent,
    FilterProductsByCategoryPipe,
    SelectRestaurantModalComponent,
    CartPageComponent,
    OrderPageComponent,
    PaymentPageComponent,
    OrderDetailsComponent,
    StripePageComponent,
    AddressFormComponent,
    ErrorCardComponent,
    MaterializeInputDirective,
    DataAppDirective,
    StyleAppDirective,
    CategoriesFilterComponent,
    CartComponent,
    RestaurantPageComponent,
    FilterProductsModalComponent,
    RestaurantComponent,
    OrderRequestComponent,
    ReservationPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBy3lj9bcQTOPcDE7nW2bIPl5A7LgcwrXY'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    RouterModule.forRoot(APP_ROUTES),
    MaterializeModule
  ],
  providers: [
    HttpModule,
    ConfigService,
    {
      //Initialize configService with appConfig.json
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true
    },
    AuthenticationService,
    AuthGuard,
    OrderService,
    WebClientService,
    ClientService,
    UserRegisterService,
    ProductService,
    RestaurantService,
    CartService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
