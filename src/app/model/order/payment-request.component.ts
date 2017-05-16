import {Address} from "../address.component";
import {OrderLine} from "./order-line.component";
import {Client} from "../user/client.component";

/**
 * Created by christian on 13/04/17.
 */

export class PaymentRequest {
    orderId: number;
    tokenStripe: string;
    savePaymentDetails: boolean;
    useDefaultCard: boolean;

    constructor(orderId: number, tokenStripe: string, savePaymentDetails: boolean, useDefaultCard: boolean) {
        this.orderId = orderId;
        this.tokenStripe = tokenStripe;
        this.savePaymentDetails = savePaymentDetails;
        this.useDefaultCard = useDefaultCard;
    }
}
