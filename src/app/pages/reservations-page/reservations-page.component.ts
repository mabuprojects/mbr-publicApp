import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book.component";

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.scss']
})
export class ReservationsPageComponent implements OnInit {

  books: Observable<Book[]>;

  constructor(private bookService: BookService) {
    this.books = this.bookService.getBooksObservable();
  }

  ngOnInit() {
    this.bookService.getBooks(true);
  }

}
