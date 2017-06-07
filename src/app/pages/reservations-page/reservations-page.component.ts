import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book.component";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.scss']
})
export class ReservationsPageComponent implements OnInit {

  books: Observable<Book[]>;

  constructor(private bookService: BookService, private productService: ProductService,
              private router: Router) {
    this.books = this.bookService.getBooksObservable();
  }

  ngOnInit() {
    this.bookService.getBooks(true);
  }

  redirectNewBook() {
    var restaurant = this.productService.getRestaurant();
    if (restaurant) {
      this.router.navigate([restaurant.name,'book']);
    } else {
      this.router.navigate(['/']);
    }
  }

}
