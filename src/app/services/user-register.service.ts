import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {ConfigService} from "./configuration/config.service";
import {Exception} from "./exceptions/exception.component";
import {WebClientService} from "./web-client.service";

@Injectable()
export class UserRegisterService {

    constructor(private webClient: WebClientService, private http: Http, private config: ConfigService) {
    }

    registerUser(email: String, password: String): Observable<boolean> {
        let body = JSON.stringify({email: email, password: password});

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.config.get('serviceUrl') + '/public/user', body, options)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleSingInError);
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


}
