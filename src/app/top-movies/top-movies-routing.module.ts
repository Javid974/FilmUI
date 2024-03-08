import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopMoviesComponent } from './components/top-movie-list/top-movie-list.component';
import { AddTopMovieComponent } from './components/add-top-movie/add-top-movie.component';
import { EditTopMovieComponent } from './components/edit-top-movie/edit-top-movie.component';

const routes: Routes = [
  { path: 'top-movies', component: TopMoviesComponent },
  { path: 'add-top-movie', component: AddTopMovieComponent },
  { path: 'edit-top-movie/:years/:id', component: EditTopMovieComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopMoviesRoutingModule {}
