"use strict";
/**
 * Created by christian on 3/03/17.
 */
var Address = (function () {
    function Address(street, number, unity, postalCode, observations, state, city, country, latitude, longitude) {
        this.street = street;
        this.number = number;
        this.unity = unity;
        this.state = state;
        this.postalCode = postalCode;
        this.observations = observations;
        this.city = city;
        this.country = country;
    }
    return Address;
}());
exports.Address = Address;
