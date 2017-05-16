import {Address} from "../address.component";
import {TimeTable} from "./time-table.component";
/**
 * Created by christian on 6/05/17.
 */
export class Restaurant {
  id: number;
  name: string;
  email: string;
  minPriceDelivery: number;
  transportPrice: number;
  phoneNumber: string;
  visible: boolean;
  nif: string;
  services: string[];
  zipCodes:number[];
  address: Address;
  timeTable:TimeTable;
}
