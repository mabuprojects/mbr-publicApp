"use strict";
/**
 * Created by alejandro on 13/04/17.
 */
var OrderRequest = (function () {
    function OrderRequest(address, restaurantId, serviceType, cashOnDelivery, clientNote) {
        this.address = address;
        this.restaurantId = restaurantId;
        this.serviceType = serviceType;
        this.cashOnDelivery = cashOnDelivery;
        this.clientNote = clientNote;
        this.orderLines = new Array();
    }
    return OrderRequest;
}());
exports.OrderRequest = OrderRequest;
