import {Component, OnInit, EventEmitter} from "@angular/core";
import {FormBuilder, Validators, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserRegisterService} from "../../services/user-register.service";
import {AuthenticationService} from "../../services/authentication.service";
import {MaterializeAction} from "angular2-materialize/dist";

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styles: ['.top-margin {margin-top: 10%;}']
})
export class SingupComponent implements OnInit {

  myForm: FormGroup;
  error = false;
  errorMessage = '';
  toastActions = new EventEmitter<string|MaterializeAction>();

  constructor(private fb: FormBuilder,
              private userRegisterService: UserRegisterService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  onSignup() {
    let email: string = this.myForm.controls['email'].value.trim();
    let pass: string = this.myForm.controls['password'].value.trim();
    this.userRegisterService.registerUser(email, pass).subscribe(
      result => {
        this.authenticationService.singin(email, pass).subscribe(
          result => {
            this.toastActions.emit('toast');
            this.router.navigate(['/']);
          })
      },
      (err) => {
        this.error = true;
        if (err.id == undefined) {
          return;
        }
        switch (err.id) {
          case 1 : {
            this.errorMessage = 'El email ya existe';
            break;
          }
          default: {
            this.errorMessage = 'Error no manejado' + err.id;
          }
        }


      });
  }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        this.isEqualPassword.bind(this)
      ])],
    });
  }

  isEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return {noEmail: true};
    }
  }

  isEqualPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.myForm) {
      return {passwordsNotMatch: true};

    }
    if (control.value !== this.myForm.controls['password'].value) {
      return {passwordsNotMatch: true};
    }
  }

  handleClose(event) {
    this.error = false;
  }
}
