"use strict";
/**
 * Created by alejandro on 13/04/17.
 */
var OrderLineRequest = (function () {
    function OrderLineRequest(id, productId, taxe, quantity, price, totalPrice) {
        this.id = id;
        this.productId = productId;
        this.taxe = taxe;
        this.quantity = quantity;
        this.price = price;
        this.optionLinePrices = new Array();
    }
    return OrderLineRequest;
}());
exports.OrderLineRequest = OrderLineRequest;
