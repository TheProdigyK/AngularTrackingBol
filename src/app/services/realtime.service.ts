import { Injectable, EventEmitter, Output } from '@angular/core';
import { RealtimeI } from './../models/realtime.interface';
import { UserI } from './../models/user.interface';

import { catchError } from 'rxjs/operators';
import { baseUrl } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { VehiculoI } from '../../app/models/vehiculo.interface';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(private http:HttpClient) { }

  getRealTime(headerDict: any, url: string):Observable<RealtimeI>{
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    
    return this.http.get<RealtimeI>(url, requestOptions)
    .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // client/network.
      console.error('An error occurred:', error.error);
    } else {
      // backend/format error.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
