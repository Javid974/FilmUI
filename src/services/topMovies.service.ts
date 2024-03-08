import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Movie } from 'src/models/movie.model';
import { TopMovie } from 'src/models/topMovie.model';

@Injectable({
  providedIn: 'root',
})
export class TopMoviesService {
  private apiUrl = environment.apiUrl;
  private lists: { id: number; name: string; movies: Movie[] }[] = [];
  constructor(private http: HttpClient) { }

  getMoviesByYears(years: number | undefined): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${this.apiUrl}/topmovies/movies/years/${years}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage: string;
          if (error.error instanceof ErrorEvent) {
            // Erreur de client
            errorMessage = `Une erreur s'est produite : ${error.error.message}`;
          } else {
            // Erreur côté serveur
            const errorResponse: HttpErrorResponse = error;
            errorMessage = `Code d'erreur : ${error.status}\nMessage : ${errorResponse.error}`;
          }

          return throwError(() => errorMessage);
        })
      );
  }

  downloadFile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/topmovies/download`, { responseType: 'blob' });
  }

  importFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/topmovies/import`, formData).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;
        errorMessage = `Code d'erreur : ${errorResponse.status}\nMessage : ${errorResponse.error}`;
        return throwError(() => errorMessage); // Rethrow so downstream consumers can handle as well
      })
    );
  }

  getTopMoviesByYears(years: number | undefined): Observable<TopMovie[]> {
    return this.http
      .get<TopMovie[]>(`${this.apiUrl}/topmovies/years/${years}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage: string;
          if (error.error instanceof ErrorEvent) {
            // Erreur de client
            errorMessage = `Une erreur s'est produite : ${error.error.message}`;
          } else {
            // Erreur côté serveur
            const errorResponse: HttpErrorResponse = error;
            errorMessage = `Code d'erreur : ${error.status}\nMessage : ${errorResponse.error}`;
          }

          return throwError(() => errorMessage);
        })
      );
  }

  getById(id: string | null): Observable<TopMovie> {
    return this.http.get<TopMovie>(`${this.apiUrl}/topmovies/${id}`);
  }

  save(topMovie: TopMovie): Observable<TopMovie> {
    return this.http.post<TopMovie>(`${this.apiUrl}/topmovies`, topMovie).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) {
          // Erreur de client
          errorMessage = `Une erreur s'est produite : ${error.error.message}`;
        } else {
          // Erreur du serveur
          const errorResponse: HttpErrorResponse = error;
          errorMessage = `Erreur ${error.status}: ${errorResponse.error}`;
        }
        return throwError(() => errorMessage);
      })
    );
  }

  update(topMovie: TopMovie): Observable<any> {
    const url = `${this.apiUrl}/topmovies/${topMovie.id}`; // Assuming movie has an id field
    return this.http.put(url, topMovie);
  }

  getLists(): { id: number; name: string; movies: Movie[] }[] {
    return this.lists;
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/topmovies/${id}`);
  }

  removeList(id: number): void {
    const index = this.lists.findIndex((list) => list.id === id);
    if (index !== -1) {
      this.lists.splice(index, 1);
    }
  }
}
