import {Component, OnInit, ViewChild, EventEmitter} from "@angular/core";
import {AddressFormComponent} from "../../shared/address-form/address-form.component";
import {MaterializeAction} from "angular2-materialize/dist";
import {ClientService} from "../../services/client.service";
import {Client} from "../../model/user/client.component";
import {Address} from "../../model/address.component";
import {ReuseFormComponent} from "../../shared/reuse-form/reuse-form.component";
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent extends ReuseFormComponent implements OnInit {

  toastUpdateActions = new EventEmitter<string|MaterializeAction>();

  client: Client;
  addressString: String = "";

  hideAddress: boolean = true;

  @ViewChild(AddressFormComponent)
  private addressForm: AddressFormComponent;

  constructor(private clientService: ClientService) {
    super();
  }

  ngOnInit() {
    this.client = new Client();
    this.clientService.getClientDetails().subscribe(c => {
      this.client = c;
      this.addressString = this.getAddressFormated(c.address);
    });
  }

  openAddressForm() {
    this.hideAddress = !this.hideAddress;
    this.addressForm.initComponent(this.client.address, "PROFILE");
  }

  onBack(newAddress: Address) {
    this.hideAddress = true;
    if (newAddress) {
      this.client.address = newAddress;
      this.addressString = this.getAddressFormated(this.client.address);
      this.toastUpdateActions.emit('toast');
    }
  }

}
