import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {AuthenticationService} from "../../services/authentication.service";
import {MaterializeAction} from "angular2-materialize/dist";

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styles: ['.top-margin {margin-top: 10%;}'],
  host: {
    class:'background-image'
  }
})
export class SinginComponent implements OnInit {

  myForm: FormGroup;
  returnUrl: string;
  error = false;
  errorMessage = '';

  toastActions = new EventEmitter<string|MaterializeAction>();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private productService: ProductService,
              private authenticationService: AuthenticationService,
              private router: Router) {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

  }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      password: ['', Validators.required],
    });
  }

  onSignin() {
    this.authenticationService.singin(this.myForm.controls['email'].value, this.myForm.controls['password'].value).subscribe(
      result => {
        if (result) {
          this.toastActions.emit('toast');
          this.redirectToMainPage();
        } else {

        }
      },
      (err) => {
        this.error = true;
        this.errorMessage = 'Username or password is incorrect';
      });
  }

  redirectToMainPage() {
    //Si vengo de una pagina en concreto
    if (this.returnUrl){
      this.router.navigate([this.returnUrl]);
    }else{
      //Si no vengo de ninguna pagina en concreto
      var restaurant = this.productService.getRestaurant();
      if (restaurant) {
        this.router.navigate([restaurant.name]);
      } else {
        this.router.navigate(['/']);
      }
    }
  }
}
