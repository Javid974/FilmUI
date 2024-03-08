import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMoviesComponent } from './components/top-movie-list/top-movie-list.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TopMoviesRoutingModule } from './top-movies-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddTopMovieComponent } from './components/add-top-movie/add-top-movie.component';
import { TopMovieFormComponent } from './components/top-movie-form/top-movie-form.component';
import { EditTopMovieComponent } from './components/edit-top-movie/edit-top-movie.component';

@NgModule({
  declarations: [
    TopMoviesComponent,
    AddTopMovieComponent,
    TopMovieFormComponent,
    EditTopMovieComponent,
  ],
  exports: [TopMoviesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TopMoviesRoutingModule,
    SharedModule,
  ],
})
export class TopMoviesModule {}
