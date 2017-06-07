import {Client} from "./user/client.component";
import {Restaurant} from "./restaurant/restaurant.component";
/**
 * Created by alejandro on 19/05/17.
 */
export class Book {
  id: number;
  name: string;
  phone: string;
  restaurant:Restaurant;
  hour:Date;
  numberOfPersons:number;
}
