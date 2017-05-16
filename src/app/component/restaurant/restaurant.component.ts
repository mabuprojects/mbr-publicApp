import {Component, OnInit, Input} from "@angular/core";
import {Restaurant} from "../../model/restaurant/restaurant.component";
import {ReuseFormComponent} from "../../shared/reuse-form/reuse-form.component";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent extends ReuseFormComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor() {
    super();
  }

  ngOnInit() {
  }


}
