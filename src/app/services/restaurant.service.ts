import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import {Restaurant} from "../model/restaurant/restaurant.component";
import {Observable, ReplaySubject} from "rxjs";
import {ConfigService} from "./configuration/config.service";
import {Exception} from "./exceptions/exception.component";

@Injectable()
export class RestaurantService {


  restaurants: Restaurant[];
  restaurantObservable: ReplaySubject<Restaurant>;
  restaurantsObservable: ReplaySubject<Restaurant[]>;

  requesting: boolean = false;

  constructor(private http: Http, private configService: ConfigService) {
    this.restaurantsObservable = new ReplaySubject(1);
    this.restaurantObservable = new ReplaySubject(1);

  }

  getRestaurantObservable(): Observable<Restaurant> {
    return this.restaurantObservable;
  }

  getRestaurantsObservable(): Observable<Restaurant[]> {
    return this.restaurantsObservable;
  }

  /**
   *Emite los restaurantes
   *
   * @param refresh Si quieres forzar la petición
   * @returns {any}
   */
  getRestaurants(refresh: boolean): void {

    var request: boolean = true;

    /*Si ya se ha hecho una petición para recuperar los restaurantes
     * no es necesario hacer otra*/
    if (this.restaurants) {
      request = false;
    }

    /*Si se quiere forzar el refresco*/
    request = refresh ? true : request;

    if (request) {
      //Si ya hay una petición en curso no hago otra
      if (this.requesting) {
        return;
      }
      this.requesting = true;

      //No ha realizado la petición o quiere forzarla
      this.http.get(this.configService.getUrl('restaurant'))
        .map(response => {
          this.requesting = false;
          this.restaurants = response.json();
          this.restaurantsObservable.next(this.restaurants);
        })
        .catch(this.handleError)
        .subscribe();
    }

  }


  /**
   *Devuelve un restaurante por el nombre
   *
   * @param restaurantId
   * @param refresh
   * @returns {any}
   */
  getRestaurantByName(restaurantName: string, refresh: boolean): void {
    var request: boolean = true;

    /*Si ya se ha hecho una petición para recuperar los restaurantes
     * no es necesario hacer otra*/
    if (this.restaurants) {
      request = false;
    }
    /*Si se quiere forzar el refresco*/
    request = refresh ? true : request;

    if (request) {
      this.getRestaurantsObservable().subscribe(rs => {
        this.restaurantObservable.next(rs.find(r => r.name === restaurantName) as Restaurant)
      });
      //Si no hay una petición en curso la hago
      if (!this.requesting) {
        this.getRestaurants(false);
      }

    } else {
      this.restaurantObservable.next(this.restaurants.find(r => r.name === restaurantName) as Restaurant);
    }
  }


  /**
   *Devuelve un restaurante por el nombre
   *
   * @param restaurantId
   * @param refresh
   * @returns {any}
   */
  getRestaurantById(restaurantId: number, refresh: boolean): Observable<Restaurant> {
    var request: boolean = true;

    /*Si ya se ha hecho una petición para recuperar los restaurantes
     * no es necesario hacer otra*/
    if (this.restaurants) {
      request = false;
    }
    /*Si se quiere forzar el refresco*/
    request = refresh ? true : request;

    if (request) {
      this.requesting = true;
      this.http.get(this.configService.getUrl('restaurant'))
        .map(response => {
          this.requesting = false;
          this.restaurants = response.json();
          return this.restaurants.find(r => r.id === restaurantId) as Restaurant;
        })
        .catch(this.handleError);

    } else {
      return Observable.of(this.restaurants.find(r => r.id === restaurantId) as Restaurant);
    }
  }

  /**
   * Maneja los errores
   * @param error
   * @returns {any}
   */
  private handleError(error: Response) {
    this.requesting = false;
    if (error.status == 400) {
      return Observable.throw(error.json() as Exception);
    }
    return Observable.throw(error.json());

  }

}
