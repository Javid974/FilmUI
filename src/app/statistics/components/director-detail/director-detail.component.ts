import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Director } from 'src/models/director.model';
import { Movie } from 'src/models/movie.model';
import { DisplayService } from 'src/services/display.services';
import { StatisticsService } from 'src/services/statistics.service';
import { TmdbService } from 'src/services/tmdb.service';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrls: ['./director-detail.component.css'],
})
export class DirectorDetailComponent implements OnInit {
  public imagesLoaded: { [posterPath: string]: boolean } = {};
  public directorId: number | null = 0;
  public movies: Array<Movie> = [];
  public director: Director = { id: 0, name: '' };
  private destroyed$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private statisticsService: StatisticsService,
    private tmdbService: TmdbService,
    private displayService: DisplayService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null) this.directorId = +id;
      this.getDirectorById(this.directorId);
      this.getMoviesByDirectorId(this.directorId);
    });
  }

  getImageUrl(posterPath: string): string | null {
    return this.tmdbService.getImageUrl(posterPath);
  }

  imageLoaded(posterPath: string): void {
    this.imagesLoaded[posterPath] = true;
  }

  getMoviesByDirectorId(id: number | null): void {
    this.statisticsService
      .getMoviesByDirectorId(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  getDirectorById(id: number | null): void {
    this.statisticsService
      .getDirector(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((director) => {
        this.director = director;
      });
  }

  getFormattedDate(date: string | null): string {
    return this.displayService.getFormattedDate(date);
  }

  getNamesList(items: { name: string }[]): string {
    return this.displayService.getNamesList(items);
  }
}
