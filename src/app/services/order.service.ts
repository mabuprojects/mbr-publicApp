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


    orders: Order[];
    ordersObservable: ReplaySubject<Order[]>;
    private restaurantId: number = 1;

    constructor(private webClient: WebClientService, private configService: ConfigService) {
        this.ordersObservable = new ReplaySubject(1);
    }


    getOrdersObservable(): Observable<Order[]> {
        return this.ordersObservable;
    }

    /**
     *Emite los pedidos
     *
     * @param refresh Si quieres forzar la petición
     * @returns {any}
     */
    getOrders(refresh: boolean): void {

        var request: boolean = true;

        if (this.orders) {
            request = false;
        }

        request = refresh ? true : request;

        if (request) {
            //No ha realizado la petición o quiere forzarla
            this.webClient.secureGet(this.configService.getUrl('order') + "/" + this.restaurantId)
                .map(response => {
                    this.orders = response.json();
                    this.ordersObservable.next(this.orders);
                })
                .catch(this.handleError)
                .subscribe();
        }

    }


    /**
     *Emite los pedidos
     *
     * @param refresh Si quieres forzar la petición
     * @returns {any}
     */
    getOrdersByClient(refresh: boolean): void {

        var request: boolean = true;

        if (this.orders) {
            request = false;
        }

        request = refresh ? true : request;

        if (request) {
            //No ha realizado la petición o quiere forzarla
            this.webClient.secureGet(this.configService.getUrl('orderByClient'))
                .map(response => {
                    this.orders = response.json();
                    this.ordersObservable.next(this.orders);
                })
                .catch(this.handleError)
                .subscribe();
        }

    }

    findOrderById(id: number, refresh: boolean): Observable<Order> {
        if (!refresh && this.orders) {
            return Observable.of(this.orders.find(o => o.id === id));
        } else {
            //No ha realizado la petición o quiere forzarla
            return this.webClient.secureGet(this.configService.getUrl('order'))
                .map(response => {
                    this.orders = response.json();
                    return this.orders.find(o => o.id === id)
                })
                .catch(this.handleError);
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
        this.getOrders(true);
    }
}
