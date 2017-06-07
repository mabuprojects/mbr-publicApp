import {FormGroup, FormControl} from "@angular/forms";
import {Address} from "../../model/address.component";

/**
 * Esta clase contiene funciones comunes reusables para todos los forms
 */
export class ReuseFormComponent{

  /**
   * Devuelve true si es válido y ya han hecho foco en él
   * @param nameControl
   * @param form
   * @returns {boolean}
   */
  controlValid(nameControl: string, form: FormGroup) {
    return form.controls[nameControl].valid && form.controls[nameControl].touched
  }

  /**
   * Devuelve true si es inválido y ya han hecho foco en él
   * @param nameControl
   * @param form
   * @returns {boolean}
   */
  controlInvalid(nameControl: string, form: FormGroup) {
    return (!form.controls[nameControl].valid) && form.controls[nameControl].touched
  }

  /**
   * Validator para minPriceDelivery -> debe ser mayor que 0
   * @param control
   * @returns {{greaterThan0: boolean}}
   */
  greaterThan0(control: FormControl) {
    return parseInt(control.value) > 0 ? null : {
        greaterThan0: true
      }
  }

  /**
   * Vacía el form
   */
  revert(form: FormGroup): void {
    form.reset();
  }


  getEmailValidator(control: FormControl): {[s: string]: boolean}{
      if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        return {noEmail: true};
      }
    }

  getAddressFormated(a: Address) {
    if (a) {
      return a.street + ' ' + a.number + ' ' + a.unity + ', CP ' + a.postalCode + ', ' + a.city + ', ' + a.state + ', ' + a.country;
    } else {
      return '';
    }
  }


}
