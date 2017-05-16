import {Component, OnInit, Output, Input, EventEmitter, ViewChild} from '@angular/core';
import {ReuseFormComponent} from "../reuse-form/reuse-form.component";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {Address} from "../../model/address.component";
import {ClientService} from "../../services/client.service";



/**
 * Este componente tiene varios modos de apertura:
 *  ORDER -> Devuelve una dirección
 *  PROFILE -> Hace un POST para establecer la nueva dirección del usuario
 */
@Component({
  selector: 'app-address-form',
  templateUrl: 'address-form.component.html'
})
export class AddressFormComponent extends ReuseFormComponent implements OnInit {

  addressForm: FormGroup;

  openMode: String;
  disableForm: boolean=false;
  error = false;
  errorMessage = '';

  @Output() onBack = new EventEmitter<Address>();

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private clientService: ClientService) {
    super();
  }

  ngOnInit() {
    this.createForm(this.createEmptyAddress());
  }

  initComponent(address: Address, openMode: String) {
    this.openMode = openMode;
    this.createForm(address);
  }

  createForm(address: Address) {
    this.addressForm = this.fb.group({
      street: [address.street, Validators.required],
      number: [address.number, Validators.required],
      unity: [address.unity, Validators.required],
      postalCode: [address.postalCode, Validators.required],
      state: [address.state, Validators.required],
      city: [address.city, Validators.required],
      country: [address.country, Validators.required],
      observations: address.observations,
    });

  }

  onExit() {
    this.onBack.emit(null);
  }

  onSubmit() {
    this.disableForm=true;
    var address: Address = this.addressForm.value;

    if (this.openMode==="PROFILE"){
      this.clientService.setClientAddress(address).subscribe(result => {
          if (result) {
            this.disableForm=false;
            this.onBack.emit(address);
          }
        },
        (err) => {
          this.disableForm=false;
          this.error = true;
          this.errorMessage = err.message;
        });
    }else{
      //openMode ==="ORDER"
      this.disableForm=false;
      this.onBack.emit(address);
    }


  }

  createEmptyAddress(): Address {
    return new Address(' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
  }

}
