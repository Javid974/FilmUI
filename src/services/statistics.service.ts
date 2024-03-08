import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environment/environment';
import { Director } from 'src/models/director.model';
import { directorMoviesCount } from 'src/models/directorMoviesCount';
import { Movie } from 'src/models/movie.model';
import { Statistics } from 'src/models/statistic.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  downloadFile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/download`, {
      responseType: 'blob',
    });
  }

  importFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/statistics/import`, formData).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;
        errorMessage = `Code d'erreur : ${errorResponse.status}\nMessage : ${errorResponse.error}`;
        return throwError(() => errorMessage); // Rethrow so downstream consumers can handle as well
      })
    );
  }
  getStatistics(years: number | undefined): Observable<Statistics> {
    return this.http.get<Statistics>(
      `${this.apiUrl}/statistics/years/${years}`
    );
  }

  getDirectorMoviesCount(): Observable<directorMoviesCount[]> {
    return this.http.get<directorMoviesCount[]>(
      `${this.apiUrl}/statistics/directorMoviesCount`
    );
  }

  getMoviesByDirectorId(id: number | null): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.apiUrl}/statistics/moviesdirector/id/${id}`
    );
  }

  getDirector(id: number | null): Observable<Director> {
    return this.http.get<Director>(
      `${this.apiUrl}/statistics/director/id/${id}`
    );
  }
}
