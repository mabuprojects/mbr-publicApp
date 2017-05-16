import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {ConfigService} from "../../services/configuration/config.service";

@Directive({
  selector: '[getDataApp]'
})
export class DataAppDirective implements OnInit {


  @Input() key: string;


  constructor(private el: ElementRef, private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.el.nativeElement.innerHTML = this.configService.getAppData(this.key);
  }
}
