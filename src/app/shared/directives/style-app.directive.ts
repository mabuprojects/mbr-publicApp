import {Directive, Input, OnInit, ElementRef, Renderer2} from "@angular/core";
import {ConfigService} from "../../services/configuration/config.service";

@Directive({
  selector: '[appStyleApp]'
})
export class StyleAppDirective implements OnInit {

  @Input() classCss: string;

  constructor(private config: ConfigService, private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    var CssClasses = this.config.getStyleApp(this.classCss);
    if (CssClasses) {
      CssClasses.split(" ").forEach(item => {
          if (item) {
            this.renderer.addClass(this.el.nativeElement, item);
          }
        }
      );
    }
  }
}
