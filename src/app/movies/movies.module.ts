import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './components/movie-list/movie-list.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    MoviesComponent,
    AddMovieComponent,
    MovieDetailComponent,
    MovieFormComponent,
    EditMovieComponent,
    UploadFileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MoviesRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgbTypeaheadModule,
    TypeaheadModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class MoviesModule {}
