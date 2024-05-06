import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { Book } from '../model/book';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatTableModule, MatIconModule, DatePipe, HttpClientModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  title = 'Book List';
  loading = true;
  books: Book[] = [];
  displayedColumns = ['id', 'title', 'author', 'actions'];
  feedback: any = {};

  constructor(private http: HttpClient, private axiosService: AxiosService) {
  }

  ngOnInit() {
    this.loading = true;
    // this.http.get<Book[]>('api/book').subscribe({
    //   next: (data: Book[]) => {
    //     this.books = data;
    //     this.loading = false;
    //     this.feedback = {};
    // },
    // error: (error) => {
    //     this.feedback = {type: 'error', message: 'There was an error in retrieving data from the server'};
    //     this.loading = false;
    // }
    // });

    this.axiosService.request(
      "GET",
      "/book",
      {}
    ).then(
      (response) => {
        console.log(response);
        this.books = response.data
        this.loading = false;
        this.feedback = {};
      }
    ).catch( error => {
      this.feedback = {type: 'error', message: 'There was an error in retrieving data from the server'};
      this.loading = false;
    })
  }

  delete(book: Book): void {
    if (confirm(`Are you sure you want to delete ${book.title}?`)) {
      this.http.delete(`api/book/${book.id}`).subscribe({
        next: () => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.ngOnInit();
          }, 1000);
        },
        error: () => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      });
    }
  }

  protected readonly event = event;
}