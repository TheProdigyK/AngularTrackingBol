import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { baseUrl } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { LoginI } from '../../app/models/login.interface';
import { UserI } from '../../app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){ }
  
  public post(url:string, body: FormGroup){
    return this.http.post(url, body);
  }

  
  login(data: any):Observable<UserI>{
    //`${baseUrl}login-0.0.1/login/validar/`    
    return this.http.post<UserI>('http://amuyutec.xyz/login-0.0.1/login/validar', data)
      .pipe(catchError(this.handleError))
      .pipe(
        map((data: UserI) => {
          localStorage.setItem('currentUser', JSON.stringify(data));
          return data
        }))
    
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
