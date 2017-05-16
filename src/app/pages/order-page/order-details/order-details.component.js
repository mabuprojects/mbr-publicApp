"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var mbr_lib_1 = require("mbr-lib");
var OrderDetailsComponent = (function () {
    function OrderDetailsComponent(route, cartService, restaurantService, fb, router, orderService, productService) {
        this.route = route;
        this.cartService = cartService;
        this.restaurantService = restaurantService;
        this.fb = fb;
        this.router = router;
        this.orderService = orderService;
        this.productService = productService;
    }
    OrderDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.order = new mbr_lib_1.Order(null, null, null, null, null, null, null, null);
        this.route.params.subscribe(function (params) {
            _this.orderId = +params['orderId'];
        });
        this.orderService.findOrderById(this.orderId, false).subscribe(function (o) { _this.order = o; debugger; });
    };
    OrderDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-order-details',
            templateUrl: './order-details.component.html'
        })
    ], OrderDetailsComponent);
    return OrderDetailsComponent;
}());
exports.OrderDetailsComponent = OrderDetailsComponent;
