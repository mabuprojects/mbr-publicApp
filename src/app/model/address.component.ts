/**
 * Created by christian on 3/03/17.
 */
export class Address {
    id: string;
    street: string;
    number: string;
    unity: string;
    postalCode: string;
    observations: string;
    state: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;


    constructor(street: string, number: string, unity: string, postalCode: string, observations: string,
                state: string, city: string, country: string, latitude: string, longitude: string) {
        this.street = street;
        this.number = number;
        this.unity = unity;
        this.state = state;
        this.postalCode = postalCode;
        this.observations = observations;
        this.city = city;
        this.country = country;
    }

}
