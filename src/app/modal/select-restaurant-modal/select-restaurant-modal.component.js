"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SelectRestaurantModalComponent = (function () {
    function SelectRestaurantModalComponent(restaurantService, productService) {
        this.restaurantService = restaurantService;
        this.productService = productService;
        this.modalActions = new core_1.EventEmitter();
        this.restaurants = this.restaurantService.getRestaurantsObservable();
    }
    SelectRestaurantModalComponent.prototype.ngOnInit = function () {
        this.restaurantService.getRestaurants(false);
    };
    SelectRestaurantModalComponent.prototype.openModal = function () {
        this.modalActions.emit({ action: "modal", params: ['open'] });
    };
    SelectRestaurantModalComponent.prototype.initModal = function () {
        if (this.show) {
            this.modalActions.emit({ action: "modal", params: ['open'] });
        }
    };
    SelectRestaurantModalComponent.prototype.closeModal = function () {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    };
    SelectRestaurantModalComponent.prototype.onSelectRestaurant = function (restaurant) {
        this.closeModal();
        this.productService.setRestaurant(restaurant);
    };
    __decorate([
        core_1.Input()
    ], SelectRestaurantModalComponent.prototype, "show", void 0);
    SelectRestaurantModalComponent = __decorate([
        core_1.Component({
            selector: 'app-select-restaurant-modal',
            templateUrl: 'select-restaurant-modal.component.html'
        })
    ], SelectRestaurantModalComponent);
    return SelectRestaurantModalComponent;
}());
exports.SelectRestaurantModalComponent = SelectRestaurantModalComponent;
