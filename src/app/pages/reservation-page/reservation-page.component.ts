import {Component, OnInit, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import {BookService} from "../../services/book.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Restaurant} from "../../model/restaurant/restaurant.component";
import {RestaurantService} from "../../services/restaurant.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})
export class ReservationPageComponent implements OnInit {


  bookForm: FormGroup;
  toastActions = new EventEmitter<string|MaterializeAction>();
  restaurant: Restaurant;
  restaurantObservable: Observable<Restaurant>;
  numberOfPersons: number = 1;
  hours: EventEmitter<{name: string;value: number}[]>;
  bookHour = null;
  name = "";
  phone = "";
  date = null;
  params = {min: new Date(), disable: []};

  constructor(private bookService: BookService, private router: Router, private productService: ProductService, private route: ActivatedRoute, private restaurantService: RestaurantService, private formBuilder: FormBuilder) {

    this.restaurantObservable = this.restaurantService.getRestaurantObservable();
    this.hours = new EventEmitter<{name: string;value: number}[]>();


    this.bookForm = this.formBuilder.group({
      numberOfPersons: [this.numberOfPersons, Validators.required],
      bookHour: [this.bookHour, Validators.required],
      date: [this.date, Validators.required],
    });

    this.bookForm.controls["date"].valueChanges
      .subscribe(date => {
        let day = new Date((this.bookForm.controls['date'].value).split("-").reverse().join("-"));
        this.bookForm.controls['bookHour'].setValue(null);
        this.initHours(day.getDay());
      });

  }

  ngOnInit() {
    this.configureRestuarantByUrl();
  }


  /**
   * Configure Restaurant by Url
   */
  configureRestuarantByUrl() {
    this.route.params.subscribe(params => {
      let restaurantName = params['restaurantName'];

      //Seteo el restaurante como el predeterminado
      this.restaurantObservable.subscribe(restaurant => {
        //Si hay un restaurante seleccionado
        if (this.productService.getRestaurant()) {
          //El de la url es diferente al actualmente seleccionado
          if (this.productService.getRestaurant().id != restaurant.id) {
            //Seteo el restaurante como el predeterminado
            this.productService.setRestaurant(restaurant);
          }
        } else {
          //Seteo el restaurante como el predeterminado
          this.productService.setRestaurant(restaurant);
        }

        this.restaurant = this.productService.getRestaurant();
        this.bookService.setRestaurantId(this.restaurant.id);

      });
      this.restaurantService.getRestaurantByName(restaurantName, false);
    });
  }

  initHours(dayOfWeek) {
    if (!this.restaurant.timeTable) {
      return;
    }
    this.params.disable = this.restaurant.timeTable.days.filter(d => !(d.openDinner || d.openMorning)).map(d => this.dayToInt(d.day));
    // this.params = Object.assign({}, this.params);
    dayOfWeek++;
    if (dayOfWeek == 7) {
      dayOfWeek = 0;
    }
    let horario = this.restaurant.timeTable.days[dayOfWeek];
    let hours = [];
    if (horario.openMorning) {
      for (let i = horario.openingMorning; i <= horario.lastHourToMorningBook; i += 30) {
        let hour = '' + Math.floor(i / 60);
        if (hour.length < 2) {
          hour = '0' + hour;
        }
        let min = '' + i % 60;
        if (min.length < 2) {
          min = '0' + min;
        }
        hours.push({name: hour + ":" + min, value: i});

      }
    }
    if (horario.openDinner) {
      for (let i = horario.openingDinner; i <= horario.lastHourToDinnerBook; i += 30) {
        let hour = '' + Math.floor(i / 60);
        if (hour.length < 2) {
          hour = '0' + hour;
        }
        let min = '' + i % 60;
        if (min.length < 2) {
          min = '0' + min;
        }
        hours.push({name: hour + ":" + min, value: i});

      }
    }
    console.log(hours);
    this.hours.emit(hours);


  }

  dayToInt(day: string) {
    let dayNum = 0;
    switch (day) {
      case 'MONDAY':
        dayNum = 0;
        break;
      case 'TUESDAY':
        dayNum = 1;
        break;
      case 'WEDNESDAY':
        dayNum = 2;
        break;
      case 'THURSDAY':
        dayNum = 3;
        break;
      case 'FRIDAY':
        dayNum = 4;
        break;
      case 'SATURDAY':
        dayNum = 5;
        break;
      case 'SUNDAY':
        dayNum = 6;
        break;
    }
    return dayNum;
  }


  onSubmit() {
    let day = new Date((this.bookForm.controls['date'].value).split("-").reverse().join("-"));
    let hour = this.bookForm.controls['bookHour'].value;

    let numberOfPersons = this.bookForm.controls['numberOfPersons'].value;
    this.bookService.book(day, hour, numberOfPersons).subscribe(r => {
      this.toastActions.emit('toast');
      this.router.navigate(['/books']);
    })
  }

}
