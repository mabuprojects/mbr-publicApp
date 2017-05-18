import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class ConfigService {

  private serviceUrl;
  private urls;
  private appData;
  private appStyle;

  constructor(private http: Http) {
  }

  public load() {
    return new Promise((resolve, reject) => {
      this.http.get('/assets/resources/appConfig.json').map(res => res.json()).catch((error: any): any => {
        console.error('Configuration file could not be read');
        resolve(true);
        return Observable.throw(error.json().error || 'Server error');
      }).subscribe(
        appConfig => {

          this.serviceUrl = appConfig['serviceUrl'];
          this.urls = appConfig['urls'];
          this.appData = appConfig['appData'];
          this.appStyle = appConfig['appStyle'];

          resolve(true);

        });
    });
  }


  getUrl(key: string) {
    return this.serviceUrl + this.urls[key];
  }

  getAppData(key: string) {
    return this.appData[key];
  }

  getStyleApp(key: string) {
    return this.appStyle[key];
  }


}

