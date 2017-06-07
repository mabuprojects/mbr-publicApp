import {Component, OnInit, Input, NgZone} from "@angular/core";
import {Restaurant} from "../../model/restaurant/restaurant.component";
import {ReuseFormComponent} from "../../shared/reuse-form/reuse-form.component";
import {MapsAPILoader} from "@agm/core";
import {Observable} from "rxjs";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent extends ReuseFormComponent implements OnInit {

  @Input() restaurant: Observable<Restaurant>;
  r: Restaurant = new Restaurant();
  lat = 40.415363;
  long = -3.707398;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,) {
    super();
  }

  ngOnInit() {
    this.restaurant.subscribe(r => {
      this.r = r;
      this.ngZone.run(() => {
        this.lat = +r.address.latitude;
        this.long = +r.address.longitude;
      });
    });
  }
}
