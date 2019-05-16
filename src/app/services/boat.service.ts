import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Boat } from '../entity/boat';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { }

  // Error Handler
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getBoats(): Observable<Boat[]> {
    return this.http.get<Boat[]>(environment.apiUrl)
      .pipe(
        tap(boats => console.log(`fetched ${boats.length} products`)),
        catchError(this.handleError('getBoats', []))
      );
  }

  getBoat(id): Observable<Boat> {
    const url = `${environment.apiUrl}/${id}`;
    return this.http.get<Boat>(url).pipe(
      tap(_ => console.log(`fetched Boat id=${id}`)),
      catchError(this.handleError<Boat>(`getBoat id=${id}`))
    );
  }

  addBoat(boat: Boat): Observable<Boat> {
    return this.http.post<Boat>(environment.apiUrl, boat, this.httpOptions).pipe(
      tap((res: Boat) => console.log(`added Boat w/ id=${res.id}`)),
      catchError(this.handleError<Boat>('addBoat'))
    );
  }

  updateBoat(id, boat: Boat): Observable<any> {
    const url = `${environment.apiUrl}/${id}`;
    return this.http.put(url, boat, this.httpOptions).pipe(
      tap(_ => console.log(`updated Boat id=${id}`)),
      catchError(this.handleError<any>('updateBoat'))
    );
  }

  deleteBoat(id): Observable<Boat> {
    const url = `${environment.apiUrl}/${id}`;

    return this.http.delete<Boat>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Boat id=${id}`)),
      catchError(this.handleError<Boat>('deleteBoat'))
    );
  }
}
