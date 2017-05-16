import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'mbr-error-card',
    template: `<div *ngIf="error" class='row '>
                  <div class='col s12 '>
                    <div class='card red lighten-2'>
                      <div class='card-content white-text small-padding'>
                
                        <p>{{errorMessage}}</p>
                        <button (click)="close()" class="alertButton btn waves-effect waves-light" type="submit" name="action">
                          <i class="alertIcon material-icons right">delete</i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                `,
    styles: [`.small-padding {
                  padding: 1em 1em;
                }
                
                .alertButton {
                  position: absolute;
                  top: 8px;
                  right: 10px;
                  padding: 0px;
                  margin: 0px;
                  background-color: indianred;
                }
                
                .alertIcon {
                  margin: 0px 5px 0px 5px
                }
                `]
})
export class ErrorCardComponent {

    @Input() public errorMessage: string = "";
    @Input() public  error: boolean = false;
    @Output() public errorChange: EventEmitter<boolean> = new EventEmitter();

    close() {
        this.error = false;
        this.errorChange.emit(this.error);
    }

}
