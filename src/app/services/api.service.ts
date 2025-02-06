import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Options, theatreData } from '../../type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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

  getData(): Observable<any> {
    return this.httpClient.get<any>('assets/film.json');  // Replace with your JSON file's path
  }
}
