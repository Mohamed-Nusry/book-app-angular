import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { HomeComponent } from './home/home.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { HomeListComponent } from './home-list/home-list.component';
import { MainContentComponent } from './main-content/main-content.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: MainContentComponent
  },
  {
    path: 'books',
    component: BookListComponent
  },
  {
    path: 'books-new',
    component: HomeListComponent
  },
  {
    path: 'book/:id',
    component: BookEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
