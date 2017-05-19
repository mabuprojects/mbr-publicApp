import {OrderRequest} from "../model/order/order-request.component";
import {Injectable} from "@angular/core";
import {ReplaySubject, Observable} from "rxjs";
import {WebClientService} from "./web-client.service";
import {Response} from "@angular/http";
import {PaymentRequest} from "../model/order/payment-request.component";
import {Order} from "../model/order/order.component";
import {ConfigService} from "./configuration/config.service";
import {Exception} from "./exceptions/exception.component";

/**
 * Created by alejandro on 15/04/17.
 */
@Injectable()
export class OrderService {


  requesting: boolean = false;
  orders: Order[];
  ordersObservable: ReplaySubject<Order[]>;
  orderObservable: ReplaySubject<Order>;
  private restaurantId: number = 1;

  constructor(private webClient: WebClientService, private configService: ConfigService) {
    this.ordersObservable = new ReplaySubject(1);
    this.orderObservable = new ReplaySubject(1);
  }


  getOrdersObservable(): Observable<Order[]> {
    return this.ordersObservable;
  }
  getOrderObservable(): Observable<Order> {
    return this.orderObservable;
  }


  /**
   *Emite los pedidos
   *
   * @param refresh Si quieres forzar la petición
   * @returns {any}
   */
  getOrdersByClient(refresh: boolean): void {
    var request: boolean = true;

    /*Si ya se ha hecho una petición para recuperar las orders
     * no es necesario hacer otra*/
    if (this.orders) {
      request = false;
    }

    /*Si se quiere forzar el refresco*/
    request = refresh ? true : request;

    if (request) {

      //Si ya hay una petición en curso no hago otra
      if (this.requesting) {
        return;
      }
      this.requesting = true;

      //No ha realizado la petición o quiere forzarla
      this.webClient.secureGet(this.configService.getUrl('orderByClient'))
        .map(response => {
          this.requesting = false;
          this.orders = response.json();
          this.ordersObservable.next(this.orders);
        })
        .catch(this.handleError)
        .subscribe();
    }

  }

  findOrderById(id: number, refresh: boolean): void {

    var request: boolean = true;

    /*Si ya se ha hecho una petición para recuperar los restaurantes
     * no es necesario hacer otra*/
    if (this.orders) {
      request = false;
    }
    /*Si se quiere forzar el refresco*/
    request = refresh ? true : request;

    if (request) {
      this.getOrdersObservable().subscribe(rs => {
        this.orderObservable.next(rs.find(o => o.id === id));
      });
      //Si no hay una petición en curso la hago
      if (!this.requesting) {
        this.getOrdersByClient(false);
      }
    } else {
      this.orderObservable.next(this.orders.find(o => o.id === id));
    }


  }


  createOrder(order: OrderRequest): Observable<Order> {
    let body = JSON.stringify(order);
    return this.webClient.securePost(this.configService.getUrl('order'), body)
      .map((response: Response) => {
        return response.json() as Order
      })
      .catch(this.handleError);
  }


  payOrder(paymentRequest: PaymentRequest): Observable<boolean> {
    let body = JSON.stringify(paymentRequest);
    return this.webClient.securePost(this.configService.getUrl('payOrder'), body)
      .map((response: Response) => {
        console.log('payment done');
        return true
      })
      .catch(this.handleError);
  }


  /**
   * Maneja los errores
   * @param error
   * @returns {any}
   */
  private handleError(error: Response) {
    if (error.status == 400) {
      return Observable.throw(error.json() as Exception);
    }
    return Observable.throw(error.json());

  }

  setRestaurantId(id: number) {
    this.restaurantId = id;
  }
}
