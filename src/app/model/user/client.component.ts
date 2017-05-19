import {User} from "./user.component";
import {Address} from "../address.component";
/**
 * Created by christian on 15/04/17.
 */
export class Client extends User {
  name: string;
  address: Address;
  stripeId: boolean;
}
