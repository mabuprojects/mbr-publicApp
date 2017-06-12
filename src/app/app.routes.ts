import {SinginComponent} from "./pages/singin-page/singin.component";
import {ProductPageComponent} from "./pages/product-page/product-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {SingupComponent} from "./pages/singup-page/singup.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";
import {OrderPageComponent} from "./pages/order-page/order-page.component";
import {PaymentPageComponent} from "./pages/payment-page/payment-page.component";
import {OrderDetailsComponent} from "./pages/order-page/order-details/order-details.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {StripePageComponent} from "./pages/stripe-page/stripe-page.component";
import {RestaurantPageComponent} from "./pages/restaurant-page/restaurant-page.component";
import {AuthGuard} from "./shared/auth-guard.service";
import {ReservationPageComponent} from "./pages/reservation-page/reservation-page.component";
import {ReservationsPageComponent} from "./pages/reservations-page/reservations-page.component";
import {ErrorPageComponent} from "./pages/error-page/error-page.component";


export const APP_ROUTES = [
  {path: '', component: MainPageComponent, pathMatch: 'full'},
  {path: 'product', component: ProductPageComponent},
  {path: 'singin', component: SinginComponent},
  {path: 'singup', component: SingupComponent},
  {path: ':restaurantName/book', component: ReservationPageComponent,canActivate: [AuthGuard]},
  {path: 'books', component: ReservationsPageComponent,canActivate: [AuthGuard]},
  {path: 'orders', component: OrderPageComponent,canActivate: [AuthGuard]},
  {path: 'orders/:orderId', component: OrderDetailsComponent, canActivate: [AuthGuard]},
  {path: 'error', component: ErrorPageComponent},
  {path: 'payment', component: PaymentPageComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'stripe/:orderId', component: StripePageComponent, canActivate: [AuthGuard]},
  {path: ':restaurantName', component: MainPageComponent},
  {path: ':restaurantName/info', component: RestaurantPageComponent},
  {path: ':restaurantName/cart', component: CartPageComponent},
  {path: ':restaurantName/product/:productName', component: ProductPageComponent},
  {path: ':restaurantName/:categoryName', component: MainPageComponent}
];
