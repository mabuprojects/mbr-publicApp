import {OptionsItemCart} from "./options-item-cart.component";
/**
 * Created by christian on 4/03/17.
 */
export class ProductCart {
  id: number;
  name: string;
  imageName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  options: OptionsItemCart[];

  constructor(id: number, name: string, imageName: string, quantity: number, price: number) {
    this.id = id;
    this.name = name;
    this.imageName = imageName;
    this.quantity = quantity;
    this.price = price;
    this.totalPrice = 0;
    this.options = new Array<OptionsItemCart>();
  }
}
