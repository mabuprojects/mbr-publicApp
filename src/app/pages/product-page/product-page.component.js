"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var ProductPageComponent = (function () {
    function ProductPageComponent(route, fb, productService) {
        this.route = route;
        this.fb = fb;
        this.productService = productService;
    }
    ProductPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.productName = params['productName'];
        });
        this.productService.getProductByName(this.productName, false).subscribe(function (p) { return _this.product = p; });
        this.createForm();
    };
    ProductPageComponent.prototype.createForm = function () {
        var _this = this;
        this.productCartForm = this.fb.group({
            productId: 0,
            productName: '',
            quantity: [1, forms_1.Validators.required],
            price: 0,
            totalPrice: 0,
            options: this.fb.array(this.product.options.map(function (o) {
                return _this.fb.group({
                    id: o.id,
                    name: o.name,
                    optionLines: _this.fb.array(o.optionLines.map(function (ol) {
                        return _this.fb.group({
                            id: ol.id,
                            name: ol.name,
                            active: [false, forms_1.Validators.required],
                            priceAdded: ol.optionLinePrices[0].priceAdded,
                        });
                    }))
                });
            }))
        });
    };
    ProductPageComponent.prototype.onSubmit = function () {
        debugger;
    };
    Object.defineProperty(ProductPageComponent.prototype, "options", {
        get: function () {
            return this.productCartForm.get('options');
        },
        enumerable: true,
        configurable: true
    });
    ;
    ProductPageComponent.prototype.getoptionLines = function (indexOption) {
        var formArray = this.productCartForm.get('options');
        return formArray.controls[indexOption].get('optionLines');
    };
    ;
    //REUSE COMPONENT FORM
    /**
     * Devuelve true si es válido y ya han hecho foco en él
     * @param nameControl
     * @param form
     * @returns {boolean}
     */
    ProductPageComponent.prototype.controlValid = function (nameControl, form) {
        return form.controls[nameControl].valid && form.controls[nameControl].touched;
    };
    /**
     * Devuelve true si es inválido y ya han hecho foco en él
     * @param nameControl
     * @param form
     * @returns {boolean}
     */
    ProductPageComponent.prototype.controlInvalid = function (nameControl, form) {
        return (!form.controls[nameControl].valid) && form.controls[nameControl].touched;
    };
    /**
     * Validator para minPriceDelivery -> debe ser mayor que 0
     * @param control
     * @returns {{greaterThan0: boolean}}
     */
    ProductPageComponent.prototype.greaterThan0 = function (control) {
        return parseInt(control.value) > 0 ? null : {
            greaterThan0: true
        };
    };
    /**
     * Vacía el form
     */
    ProductPageComponent.prototype.revert = function (form) {
        form.reset();
    };
    ProductPageComponent.prototype.getEmailValidator = function (control) {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return { noEmail: true };
        }
    };
    ProductPageComponent = __decorate([
        core_1.Component({
            selector: 'app-product-page',
            templateUrl: 'product-page.component.html'
        })
    ], ProductPageComponent);
    return ProductPageComponent;
}());
exports.ProductPageComponent = ProductPageComponent;
