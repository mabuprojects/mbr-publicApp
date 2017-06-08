import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";
import {ConfigService} from "./services/configuration/config.service";
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {




  constructor(private router: Router, translate: TranslateService, private titleService: Title, private config: ConfigService) {
    //set page title
    this.titleService.setTitle(this.config.getAppData('companyName'));
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(translate.getBrowserLang());

    translate.addLangs(['es','en']);

    //Google analytics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

}
