"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var SingupComponent = (function () {
    function SingupComponent(fb, userRegisterService, authenticationService, router) {
        this.fb = fb;
        this.userRegisterService = userRegisterService;
        this.authenticationService = authenticationService;
        this.router = router;
        this.error = false;
        this.errorMessage = '';
    }
    SingupComponent.prototype.onSignup = function () {
        var _this = this;
        var email = this.myForm.controls['email'].value.trim();
        var pass = this.myForm.controls['password'].value.trim();
        this.userRegisterService.registerUser(email, pass).subscribe(function (result) {
            _this.authenticationService.singin(email, pass).subscribe(function (result) {
                _this.router.navigate(['/']);
            });
        }, function (err) {
            _this.error = true;
            if (err.id == undefined) {
                return;
            }
            switch (err.id) {
                case 1: {
                    _this.errorMessage = 'El email ya existe';
                    break;
                }
                default: {
                    _this.errorMessage = 'Error no manejado' + err.id;
                }
            }
        });
    };
    SingupComponent.prototype.ngOnInit = function () {
        this.myForm = this.fb.group({
            email: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    this.isEmail
                ])],
            password: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(8)
                ])],
            confirmPassword: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    this.isEqualPassword.bind(this)
                ])],
        });
    };
    SingupComponent.prototype.isEmail = function (control) {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return { noEmail: true };
        }
    };
    SingupComponent.prototype.isEqualPassword = function (control) {
        if (!this.myForm) {
            return { passwordsNotMatch: true };
        }
        if (control.value !== this.myForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    };
    SingupComponent.prototype.handleClose = function (event) {
        this.error = false;
    };
    SingupComponent = __decorate([
        core_1.Component({
            selector: 'app-singup',
            templateUrl: './singup.component.html',
            styles: ['.top-margin {margin-top: 10%;}']
        })
    ], SingupComponent);
    return SingupComponent;
}());
exports.SingupComponent = SingupComponent;
