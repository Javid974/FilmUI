import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/components/movie-list/movie-list.component';
import { MoviesService } from 'src/services/movies.service';
import { TmdbService } from 'src/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { MoviesModule } from './movies/movies.module';
import { StatisticsModule } from './statistics/statistics.module';
import { TopMoviesModule } from './top-movies/top-movies.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MoviesModule,
    StatisticsModule,
    TopMoviesModule,
  ],
  providers: [MoviesService, TmdbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
