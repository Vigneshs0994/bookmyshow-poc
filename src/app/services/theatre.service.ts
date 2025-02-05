import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, PaginationParams, theatreData } from '../../type';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  apiUrl = 'assets/films.json';
  
  constructor(private httpClient: HttpClient) { }

  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  put<T>(url: string, body: theatreData, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  post<T>(url: string, body: theatreData, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  getFilms(): Observable<any> {
    return this.httpClient.get<any>('assets/films.json');  // Make sure the path is correct
  }
 
  getTheatrename(id: number): Observable<any> {
    /* this.httpClient.get<any[]>('assets/films.json')
      .pipe(
        map(data => data.filter(item => item.id === id))
      );*/
      return this.httpClient.get<any[]>('assets/films.json').pipe(
        map(cinemas => cinemas.find(cinema => cinema.id === id))
      );
     /* .pipe(
        map(data => {
          return data.map(theatre => {
            // Filter the showtimes by showtimeIndex
            theatre.showtimes = theatre.showtimes.filter((showtime: { showtimeIndex: any; }) => showtime.showtimeIndex === id);
            return theatre;
          }).filter(theatre => theatre.showtimes.length > 0);  // Only keep theatres with valid showtimes
        })
      );*/
  }

/*  getSeatsByCinemaAndShowtime(cinemaId: number, showtimeIndex: number): Observable<string[]> {
    return this.httpClient.get<any[]>('assets/films.json').pipe(
      map(cinemas => {
        const cinema = cinemas.find(c => c.id === cinemaId);
        if (cinema) {
          const showtime = cinema.showtimes.find((s: { showtimeIndex: number; }) => s.showtimeIndex === showtimeIndex);
          return showtime ? showtime.seats : [];
        }
        return [];
      })
    );    
  }*/

  getSeatsByCinemaAndTime(cinemaId: number, time: string): Observable<string[]> {
    return this.httpClient.get<any[]>('assets/films.json').pipe(
      map(cinemas => {
        const cinema = cinemas.find(c => c.id === cinemaId);
        if (cinema) {
          // Find the showtime matching the time string
          const showtime = cinema.showtimes.find((s: { time: string; }) => s.time === time);
          return showtime ? showtime.seats : [];
        }
        return [];
      })
    );
  }
  
  getSeatsByFilmDetails(cinemaId: number, filmName: string, date: string, time: string): Observable<any> {
    return this.httpClient.get<any[]>('assets/films.json').pipe(
      map(data => {
        const cinema = data.find((c: any) => c.id === cinemaId); // Find the cinema by id
          if (cinema) {
          const film = cinema.films.find((f: any) => f.filmName === filmName); // Find the film by name
            if (film) {
            const showtime = film.showtimes.find((s: any) => s.date === date && s.time === time); // Find the showtime by date and time
             return showtime || {}; // Return the found showtime or an empty object if not found
          }
        }
        return {}; // If cinema or film not found, return empty object
      })
    );
  }

 


  updateCinemaData(cinemaData: any): Observable<any> {
    return this.httpClient.put<any>('assets/films.json', cinemaData);
  }


  getTheatre = (
    url: string, params: PaginationParams
  ): Observable<theatreData> => {
    return this.get(url, {params,
      responseType: 'json',
    });
  };

}
