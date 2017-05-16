"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var product_card_component_1 = require("./pages/main-page/product-card/product-card.component");
var main_page_component_1 = require("./pages/main-page/main-page.component");
var nav_bar_component_1 = require("./nav-bar/nav-bar.component");
var footer_component_1 = require("./footer/footer.component");
var product_page_component_1 = require("./pages/product-page/product-page.component");
var profile_page_component_1 = require("./pages/profile-page/profile-page.component");
var blog_page_component_1 = require("./pages/blog-page/blog-page.component");
var singin_component_1 = require("./pages/singin-page/singin.component");
var app_routes_1 = require("./app.routes");
var mbr_lib_1 = require("mbr-lib");
var singup_component_1 = require("./pages/singup-page/singup.component");
var filter_products_by_category_pipe_1 = require("./pipes/filter-products-by-category.pipe");
var angular2_materialize_1 = require("angular2-materialize");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require('@ngx-translate/http-loader');
var select_restaurant_modal_component_1 = require('./component/select-restaurant-modal/select-restaurant-modal.component');
var cart_page_component_1 = require('./pages/cart-page/cart-page.component');
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                product_card_component_1.ProductCardComponent,
                main_page_component_1.MainPageComponent,
                nav_bar_component_1.NavBarComponent,
                footer_component_1.FooterComponent,
                product_page_component_1.ProductPageComponent,
                profile_page_component_1.ProfilePageComponent,
                blog_page_component_1.BlogPageComponent,
                singin_component_1.SinginComponent,
                singup_component_1.SingupComponent,
                filter_products_by_category_pipe_1.FilterProductsByCategoryPipe,
                select_restaurant_modal_component_1.SelectRestaurantModalComponent,
                cart_page_component_1.CartPageComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [http_1.Http]
                    }
                }),
                router_1.RouterModule.forRoot(app_routes_1.APP_ROUTES),
                mbr_lib_1.SeedModule,
                angular2_materialize_1.MaterializeModule
            ],
            providers: [mbr_lib_1.AuthenticationService, mbr_lib_1.UserRegisterService, mbr_lib_1.ProductService, mbr_lib_1.RestaurantService, mbr_lib_1.ConfigService, mbr_lib_1.CategoryService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
