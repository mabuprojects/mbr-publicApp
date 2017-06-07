import {Component, OnInit, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import {Book} from "../../model/book.component";
import {BookService} from "../../services/book.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Restaurant} from "../../model/restaurant/restaurant.component";
import {RestaurantService} from "../../services/restaurant.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})
export class ReservationPageComponent implements OnInit {

  books: Observable<Book[]>;
  bookForm: FormGroup;
  restaurant: Restaurant;
  restaurantObservable: Observable<Restaurant>;
  numberOfPersons: number = 1;
  hours: EventEmitter<{name: string;value: number}[]>;

  bookHour = 7 * 60;
  name = "";
  phone = "";
  date = new Date();
  params = {min: new Date(), disable: []};

  constructor(private bookService: BookService, private productService: ProductService, private route: ActivatedRoute, private restaurantService: RestaurantService, private formBuilder: FormBuilder) {
    this.books = this.bookService.getBooksObservable();
    this.restaurantObservable = this.restaurantService.getRestaurantObservable();
    this.hours = new EventEmitter<{name: string;value: number}[]>();


    this.bookForm = this.formBuilder.group({
      numberOfPersons: [this.numberOfPersons, Validators.required],
      bookHour: [this.bookHour],
      date: [this.date],
    });

    this.bookForm.controls["date"].valueChanges
      .debounceTime(100) // wait a litle after the user input (ms)
      .subscribe(date => {
        if (date) {
          let day = new Date((this.bookForm.controls['date'].value).split("-").reverse().join("-"));
          console.log('Día' + day.getDay());
          this.initHours(day.getDay());
        }

      });

  }

  ngOnInit() {
    this.configureRestuarantByUrl();
    this.bookService.getBooks(true);
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
    this.params.disable = this.restaurant.timeTable.days.map(d => (d.openDinner || d.openMorning) ? null : this.dayToInt(d.day) + 1).filter(d => d != null);
    this.params = Object.assign({}, this.params);
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
    this.bookService.book(day, hour, numberOfPersons);
  }

}
