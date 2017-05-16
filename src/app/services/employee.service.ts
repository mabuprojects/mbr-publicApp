import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";

import {WebClientService} from "./web-client.service";
import {Exception} from "../../../../mbr-privateApp/src/app/core/exception.component";
import {ConfigService} from "./configuration/config.service";

@Injectable()
export class EmployeeService {

    public newUser:EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private webClient: WebClientService, private http: Http, private config: ConfigService) {
    }

    registerEmployee(email: String, password: String, name: String, roles: number[]) {
        let body = JSON.stringify({email: email, password: password, name: name, roles: roles});

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.webClient.securePost(this.config.getUrl('employee'), body)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleSingInError);

    }

    private handleSingInError(error: any) {
        if (error.status == 400) {
            return Observable.throw(error.json() as Exception);
        }
        return Observable.throw(error.json());

    }


    employeeCreated() {
        this.newUser.emit(true);
    }


}
