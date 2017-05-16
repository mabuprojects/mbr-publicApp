import {Address} from "../address.component";
import {OrderLine} from "./order-line.component";
import {Client} from "../user/client.component";
/**
 * Created by christian on 13/04/17.
 */

export class Order {
    id: number;
    client: Client;
    address: Address;
    restaurantId: number;
    serviceType: string;
    estimatedPickupOrDeliveryTime: Date;
    totalPrice: number;
    deliveryCharge: number;
    cashOnDelivery: boolean;
    clientNote: string;
    created: Date;
    sent: Date;
    status: string;
    orderLines:OrderLine[];
}
