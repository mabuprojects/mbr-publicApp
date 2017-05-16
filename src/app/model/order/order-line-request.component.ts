import {Taxe} from "../taxe.component";
import {OptionLinePrice} from "../option-line-price.component";
import {OrderLinePriceRequest} from "./order-line-price-request.component";
/**
 * Created by christian on 13/04/17.
 */
export class OrderLineRequest {
    productId: number;
    quantity: number;
    orderLinePrices: OrderLinePriceRequest[];


    constructor(productId: number, quantity: number) {

        this.productId=productId;

        this.quantity=quantity;

        this.orderLinePrices = new Array<OrderLinePriceRequest>();
    }
}
