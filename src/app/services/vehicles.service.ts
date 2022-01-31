import { RealtimeI } from './../models/realtime.interface';
import { UserI } from './../models/user.interface';
import { Injectable, EventEmitter, Output } from '@angular/core';
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
export class VehiclesService {
  @Output() apikey: EventEmitter<UserI> = new EventEmitter();

  constructor(private http: HttpClient){ }
  
  getRealTime(headerDict: any, url: string):Observable<RealtimeI>{
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    
    return this.http.get<RealtimeI>(url, requestOptions)
    .pipe(catchError(this.handleError))
  }

  getVehicles(headerDict: any):Observable<VehiculoI[]>{
    //`${baseUrl}login-0.0.1/login/validar/`
    
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict),
    };

    
    return this.http.get<VehiculoI[]>('http://amuyutec.xyz/admin-0.0.1/dispositivo/obtenerDispositivosPorPersona/1', requestOptions)
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
