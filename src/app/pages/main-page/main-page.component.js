"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var MainPageComponent = (function () {
    function MainPageComponent(productService, route, restaurantService, categoryService) {
        this.productService = productService;
        this.route = route;
        this.restaurantService = restaurantService;
        this.categoryService = categoryService;
        this.modalActions = new core_1.EventEmitter();
        this.products = this.productService.getProductsRestaurantObservable();
        this.restaurant = this.restaurantService.getRestaurantObservable();
        this.restaurants = this.restaurantService.getRestaurantsObservable();
    }
    MainPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.restaurantService.getRestaurants(false);
        this.route.params.subscribe(function (params) {
            _this.restaurantName = params['restaurantName'];
        });
        //Si recibo un restaurante como parametro muestro sus productos
        if (this.restaurantName) {
            this.restaurant.subscribe(function (restaurant) { return _this.productService.getFilterProductsByRestaurant(restaurant.id, false); });
            this.restaurantService.getRestaurantByName(this.restaurantName, false);
        }
        else {
            //Si no recibo ningun restaurante como parámetro, muestro los productos del primero
            this.restaurants.subscribe(function (rs) { return _this.productService.getFilterProductsByRestaurant(rs[0].id, false); });
        }
    };
    Object.defineProperty(MainPageComponent.prototype, "show", {
        get: function () {
            if (this.restaurantName) {
                return false;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    MainPageComponent = __decorate([
        core_1.Component({
            selector: 'app-main-page',
            templateUrl: 'main-page.component.html'
        })
    ], MainPageComponent);
    return MainPageComponent;
}());
exports.MainPageComponent = MainPageComponent;
