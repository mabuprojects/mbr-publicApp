"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var NavBarComponent = (function () {
    function NavBarComponent(authenticationService, categoryService, translateService) {
        this.authenticationService = authenticationService;
        this.categoryService = categoryService;
        this.translateService = translateService;
    }
    NavBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authenticationService.isAuthenticated().subscribe(function (authStatus) {
            _this.autenticated = authStatus;
        });
        this.autenticated = this.authenticationService.isNowAuthenticated();
        this.languages = this.translateService.getLangs().map(function (lang) {
            return { value: lang, label: lang };
        });
        this.languages = [{ value: "en", label: "English", flag: "us" }, { value: "es", label: "Spanish", flag: "es" }];
    };
    NavBarComponent.prototype.logOut = function () {
        this.authenticationService.logOut();
    };
    NavBarComponent.prototype.select = function (value) {
        this.translateService.use(value);
    };
    NavBarComponent = __decorate([
        core_1.Component({
            selector: 'app-nav-bar',
            templateUrl: './nav-bar.component.html'
        })
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
