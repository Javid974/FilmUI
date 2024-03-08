import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '56bc95025330b544721626eb473945e3';
  private imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  constructor() {}

  searchMovies(query: string) {
    const url = `${this.baseUrl}/search/movie`;
    return axios.get(url, {
      params: {
        api_key: this.apiKey,
        query: query,
        language: 'fr',
      },
    });
  }

  getMoviesGenres() {
    const url = `${this.baseUrl}/genre/movie/list`;
    return axios.get(url, {
      params: {
        api_key: this.apiKey,
        language: 'fr',
      },
    });
  }

  getMovieCountries() {
    const url = `${this.baseUrl}/configuration/countries`;
    return axios.get(url, {
      params: {
        api_key: this.apiKey,
        language: 'fr',
      },
    });
  }

  getMovieDetails(id: number) {
    const url = `${this.baseUrl}/movie/${id}`;
    return axios.get(url, {
      params: {
        api_key: this.apiKey,
        language: 'fr',
      },
    });
  }

  getMovieCredits(id: number) {
    const url = `${this.baseUrl}/movie/${id}/credits`;
    return axios.get(url, {
      params: {
        api_key: this.apiKey,
      },
    });
  }

  getImageUrl(path: string): string {
    return `${this.imageBaseUrl}${path}`;
  }
}
