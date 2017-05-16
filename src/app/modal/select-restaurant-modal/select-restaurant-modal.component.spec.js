"use strict";
var testing_1 = require('@angular/core/testing');
var select_restaurant_modal_component_1 = require('./select-restaurant-modal.component.ts');
describe('SelectRestaurantModalComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [select_restaurant_modal_component_1.SelectRestaurantModalComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(select_restaurant_modal_component_1.SelectRestaurantModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
