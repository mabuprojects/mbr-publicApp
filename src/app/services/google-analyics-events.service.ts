import {Injectable} from "@angular/core";

@Injectable()
export class GoogleAnalyicsEventsService {

  constructor() {
  }

  public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {

    ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }

  /**
   * Producto añadido al carrito
   * @param id
   * @param name
   * @param category
   * @param quantity
   */
  public addProductEvent(id: string,
                          name: string,
                          quantity: number = null) {

    ga('ec:addProduct', {
      'id': id,
      'name': name,
      'quantity': quantity,
    });
    ga('ec:setAction', 'add');
    ga('send', 'event', 'UX', 'click', 'add to cart');     // Send data using an event.
  }

  /**
   * Producto eliminado del carrito de la compra
   * @param id
   * @param name
   * @param category
   * @param quantity
   */
  public removeProductEvent(id: string,
                          name: string,
                          quantity: number = null) {

    ga('ec:removeProduct', {
      'id': id,
      'name': name,
      'quantity': quantity,
    });
    ga('ec:setAction', 'remove');
    ga('send', 'event', 'UX', 'click', 'remove to cart');     // Send data using an event.
  }


  /**
   * Para especificar un pago
   * @param id
   * @param name
   * @param category
   * @param quantity
   */
  public checkoutEvent() {
    // In the case of checkout actions, an additional actionFieldObject can
    // specify a checkout step and option.
    ga('ec:setAction','checkout', {
      'step': 1,            // A value of 1 indicates this action is first checkout step.
      'option': 'Visa'      // Used to specify additional info about a checkout stage, e.g. payment method.
    });
    ga('send', 'event', 'UX', 'click', 'checkout');

  }


  public transactionEvent() {

    // Transaction level information is provided via an actionFieldObject.
    ga('ec:setAction', 'purchase', {
      'id': 'T12345',
      'affiliation': 'Google Store - Online',
      'revenue': '455.39',
      'tax': '2.85',
      'shipping': '5.34',
      'coupon': 'SUMMER2013'    // User added a coupon at checkout.
    });
    ga('send', 'pageview');

  }




}
