import { NgModule } from '@angular/core';
import { MoviesComponent } from './components/movie-list/movie-list.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

const routes: Routes = [
  { path: 'movie-list', component: MoviesComponent },
  { path: 'add-movie', component: AddMovieComponent },
  { path: 'edit-movie/:id', component: EditMovieComponent },
  { path: 'movie-detail/:id', component: MovieDetailComponent },
  { path: 'movie/upload', component: UploadFileComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
