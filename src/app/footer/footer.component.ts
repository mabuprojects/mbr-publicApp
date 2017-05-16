import {Component, OnInit} from "@angular/core";
import {ConfigService} from "../services/configuration/config.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  youtubeLink: string;

  constructor(private configService: ConfigService) {
    this.facebookLink = this.configService.getAppData('facebookLink');
    this.twitterLink = this.configService.getAppData('twitterLink');
    this.instagramLink = this.configService.getAppData('instagramLink');
    this.youtubeLink = this.configService.getAppData('youtubeLink');
  }

  ngOnInit() {
  }

}
