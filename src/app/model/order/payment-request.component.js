"use strict";
/**
 * Created by alejandro on 13/04/17.
 */
var PaymentRequest = (function () {
    function PaymentRequest(orderId, tokenStripe, savePaymentDetails, useDefaultCard) {
        this.orderId = orderId;
        this.tokenStripe = tokenStripe;
        this.savePaymentDetails = savePaymentDetails;
        this.useDefaultCard = useDefaultCard;
    }
    return PaymentRequest;
}());
exports.PaymentRequest = PaymentRequest;
