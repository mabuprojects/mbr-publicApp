import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";

import {WebClientService} from "./web-client.service";
import {ConfigService} from "./configuration/config.service";
import {Exception} from "./exceptions/exception.component";
import {Router} from "@angular/router";

@Injectable()
export class EmployeeService {

    public newUser:EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private webClient: WebClientService, private http: Http, private config: ConfigService, private router: Router) {
    }

    registerEmployee(email: String, password: String, name: String, roles: number[]) {
        let body = JSON.stringify({email: email, password: password, name: name, roles: roles});

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.webClient.securePost(this.config.getUrl('employee'), body)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleSingInError.bind(this));

    }

    private handleSingInError(error: any) {
      if (error.status == 400) {
        return Observable.throw(error.json() as Exception);
      } else if (error.status == 0){
        this.router.navigate(['/error']);
      }
        return Observable.throw(error.json());

    }


    employeeCreated() {
        this.newUser.emit(true);
    }


}
