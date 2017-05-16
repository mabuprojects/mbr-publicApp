import {Address} from "../address.component";
import {OrderLineRequest} from "./order-line-request.component";

/**
 * Created by christian on 13/04/17.
 */

export class OrderRequest {

    clientId: number;
    address: Address;
    restaurantId: number;
    serviceType: string;
    cashOnDelivery: boolean;
    clientNote: string;
    orderLines: OrderLineRequest[];


    constructor(address: Address, restaurantId: number, serviceType: string, cashOnDelivery: boolean, clientNote: string) {
        this.address = address;
        this.restaurantId=restaurantId;
        this.serviceType = serviceType;
        this.cashOnDelivery = cashOnDelivery;
        this.clientNote = clientNote;
        this.orderLines = new Array<OrderLineRequest>();
    }
}
