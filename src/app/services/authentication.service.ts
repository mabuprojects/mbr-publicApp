import {Injectable, OnInit, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import {Response, Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/Rx";

import {User} from "../model/user/user.component";
import {ConfigService} from "./configuration/config.service";
import {Exception} from "./exceptions/exception.component";
@Injectable()
export class AuthenticationService implements OnInit {

    token: string | null;

    private authenticated: boolean;
    private authenticatedObservable: EventEmitter<boolean> = new EventEmitter();


    private redirectUrl: string = '';

    private user: User;
    private roles: string[];

    constructor(private http: Http, private config: ConfigService) {
        let user = localStorage.getItem('currentUser');
        if (user != null) {
            var currentUser = JSON.parse(user);
        }
        this.token = currentUser && currentUser.token;
        if (this.isNowAuthenticated()) {
            this.getUserData();
        }
    }

    ngOnInit() {

        this.authenticationChanged();
    }

    singin(email: String, password: String): Observable<boolean> {
        let body = JSON.stringify({username: email, password: password});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.config.getUrl('/auth'), body, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({username: email, token: token}));

                    this.getUserData();
                    this.authenticationChanged();
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            })
            .catch(this.handleSingInError);
    }

    private handleSingInError(error: Response) {
        if (error.status == 400) {
            return Observable.throw(error.json() as Exception);
        }
        return Observable.throw(error.json());

    }


    private getUserData() {
        let headers = new Headers({'Content-Type': 'application/json'});

        headers.append('Authorization', this.token == null ? '' : this.token);
        let options = new RequestOptions({headers: headers});

        this.http.get(this.config.getUrl('user'), options).subscribe(response => {
            this.user = response.json() as User;
            if (this.user != null) {
                this.roles=this.user.authorities.map(e => e.authority);
            }

        });

    }


    isAuthenticated(): Observable<boolean> {
        return this.authenticatedObservable;
    }

    private authenticationChanged() {
        this.authenticated = this.token != null;
        this.authenticatedObservable.emit(this.authenticated);

    }

    isNowAuthenticated(): boolean {
        return this.token != null;
    }

    logOut() {
        localStorage.removeItem('currentUser');
        this.token = null;

        this.authenticationChanged();

    }

    setRedirectUrl(url: string) {
        this.redirectUrl = url;
    }

    getRedirectUrl(): string {
        return this.redirectUrl;
    }

    getUser(): User {
        return this.user;
    }

    getRoles(): string[] {
        return this.roles;
    }


}
