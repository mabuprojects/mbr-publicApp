import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Client} from "../model/user/client.component";
import {WebClientService} from "./web-client.service";
import {Response} from "@angular/http";
import {Address} from "../model/address.component";
import {ConfigService} from "./configuration/config.service";
import {Exception} from "./exceptions/exception.component";
import {Router} from "@angular/router";

@Injectable()
export class ClientService {


  constructor(private webClient: WebClientService, private configService: ConfigService, private router: Router) {

  }

  /**
   * Return client details
   *
   * @returns {Observable<R>}
   */
  getClientDetails(): Observable<Client> {
    return this.webClient.secureGet(this.configService.getUrl('client'))
      .map(response => {
        return response.json() as Client;
      })
      .catch(this.handleError.bind(this));
  }

  /**
   *
   * Set client adddres
   * @param address
   * @returns {Observable<R>}
   */
  setClientAddress(address: Address): Observable<boolean> {
    let body = JSON.stringify(address);
    return this.webClient.securePost(this.configService.getUrl('clientAddress'), body)
      .map((response: Response) => {
        return true
      })
      .catch(this.handleError.bind(this));
  }

  deleteBankCard(): Observable<boolean> {
    return this.webClient.secureDelete(this.configService.getUrl('clientBankCard'))
      .map((response: Response) => {
        return true
      })
      .catch(this.handleError.bind(this));
  }


  private handleError(error: Response) {
    if (error.status == 400) {
      return Observable.throw(error.json() as Exception);
    } else if (error.status == 0){
      this.router.navigate(['/error']);
    }
    return Observable.throw(error.json());

  }


}
