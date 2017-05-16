"use strict";
var singin_component_1 = require("./pages/singin-page/singin.component");
var blog_page_component_1 = require("./pages/blog-page/blog-page.component");
var product_page_component_1 = require("./pages/product-page/product-page.component");
var main_page_component_1 = require("./pages/main-page/main-page.component");
var singup_component_1 = require("./pages/singup-page/singup.component");
var cart_page_component_1 = require("./pages/cart-page/cart-page.component");
exports.APP_ROUTES = [
    { path: '', component: main_page_component_1.MainPageComponent, pathMatch: 'full' },
    { path: 'product', component: product_page_component_1.ProductPageComponent },
    { path: 'blog', component: blog_page_component_1.BlogPageComponent },
    { path: 'singin', component: singin_component_1.SinginComponent },
    { path: 'singup', component: singup_component_1.SingupComponent },
    { path: 'cart', component: cart_page_component_1.CartPageComponent },
    { path: ':restaurantName', component: main_page_component_1.MainPageComponent },
    { path: ':restaurantName/product/:productName', component: product_page_component_1.ProductPageComponent },
    { path: ':restaurantName/:categoryName', component: main_page_component_1.MainPageComponent }
];
