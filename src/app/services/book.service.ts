import {Injectable} from "@angular/core";
import {ReplaySubject, Observable} from "rxjs";
import {Response} from "@angular/http";
import {Book} from "../model/book.component";
import {WebClientService} from "./web-client.service";
import {ConfigService} from "./configuration/config.service";
import {Exception} from "./exceptions/exception.component";
import {Router} from "@angular/router";


@Injectable()
export class BookService {

  books: Book[];
  booksObservable: ReplaySubject<Book[]>;
  private restaurantId: number = 1;


  constructor(private webClient: WebClientService, private configService: ConfigService, private router: Router) {
    this.booksObservable = new ReplaySubject(1);

  }


  setRestaurantId(id: number) {
    this.restaurantId = id;
    this.getBooks(true);
  }

  getBooksObservable(): Observable<Book[]> {
    return this.booksObservable;
  }

  /**
   *Emite los pedidos
   *
   * @param refresh Si quieres forzar la petición
   * @returns {any}
   */
  getBooks(refresh: boolean): void {

    var request: boolean = true;

    if (this.books) {
      request = false;
    }

    request = refresh ? true : request;

    if (request) {
      //No ha realizado la petición o quiere forzarla
      this.webClient.secureGet(this.configService.getUrl('books'))
        .map(response => {
          this.books = response.json();
          this.booksObservable.next(this.books);
        })
        .catch(this.handleError.bind(this))
        .subscribe();
    }

  }


  /**
   * Maneja los errores
   * @param error
   * @returns {any}
   */
  private handleError(error: Response) {
    if (error.status == 400) {
      return Observable.throw(error.json() as Exception);
    } else if (error.status == 0){
      this.router.navigate(['/error']);
    }
    return Observable.throw(error.json());

  }

  cancel(bookId: number) {
    this.changeBookStatus(bookId, "cancel");
  }


  changeBookStatus(orderId: number, target: string): void {
    this.webClient.securePatch(this.configService.getUrl('book') + "/" + orderId + "/" + target, "")
      .map((response: Response) => {
        this.getBooks(true);
      })
      .catch(this.handleError.bind(this))
      .subscribe();
  }

  book(day: Date, hour: number, numberOfPersons: number): Observable<boolean>  {
    day.setHours(Math.floor(hour / 60), Math.floor(hour % 60));
    day = new Date(day.getTime() - day.getTimezoneOffset() * 60000);
    let data = {
      'restaurantId': this.restaurantId,
      'hour': day.getTime(),
      'numberOfPersons': numberOfPersons,
    };
    return this.webClient.securePost(this.configService.getUrl('book'), data)
      .map((response: Response) => {
        this.getBooks(true);
        return true;
      })
      .catch(this.handleError.bind(this));
  }

  getRestaurantId() {
    return this.restaurantId;
  }


}
