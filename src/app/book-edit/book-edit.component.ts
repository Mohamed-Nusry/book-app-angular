import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Book } from '../model/book';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatTooltipModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  book!: Book;
  feedback: any = {};

  constructor(private route: ActivatedRoute, private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.route.params.pipe(
      map(p => p['id']),
      switchMap(id => {
        if (id === 'new') {
          return of(new Book());
        }
        return this.http.get<Book>(`api/book/${id}`);
      })
    ).subscribe({
      next: book => {
        this.book = book;
        this.feedback = {};
      },
      error: () => {
        this.feedback = {type: 'warning', message: 'Error loading'};
      }
    });
  }

  save() {
    const id = this.book.id;
    const method = id ? 'put' : 'post';

    this.http[method](`/api/book${id ? '/' + id : ''}`, this.book).subscribe({
      next: () => {
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(async () => {
          await this.router.navigate(['/books']);
        }, 1000);
      },
      error: () => {
        this.feedback = {type: 'error', message: 'Error saving'};
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/books']);
  }

  addEvent() {
    // this.book.events.push(new Event());
  }

  // removeEvent(index: number) {
  //   this.book.events.splice(index, 1);
  // }
}