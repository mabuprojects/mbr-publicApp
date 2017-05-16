"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var SinginComponent = (function () {
    function SinginComponent(fb, authenticationService, router) {
        this.fb = fb;
        this.authenticationService = authenticationService;
        this.router = router;
        this.error = false;
        this.errorMessage = '';
    }
    SinginComponent.prototype.ngOnInit = function () {
        this.myForm = this.fb.group({
            email: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
            password: ['', forms_1.Validators.required],
        });
    };
    SinginComponent.prototype.onSignin = function () {
        var _this = this;
        console.log("eoooo");
        this.authenticationService.singin(this.myForm.controls['email'].value, this.myForm.controls['password'].value).subscribe(function (result) {
            if (result) {
                _this.router.navigate(['/']);
            }
            else {
            }
        }, function (err) {
            _this.error = true;
            _this.errorMessage = 'Username or password is incorrect';
        });
    };
    SinginComponent = __decorate([
        core_1.Component({
            selector: 'app-singin',
            templateUrl: './singin.component.html',
            styles: ['.top-margin {margin-top: 10%;}']
        })
    ], SinginComponent);
    return SinginComponent;
}());
exports.SinginComponent = SinginComponent;
