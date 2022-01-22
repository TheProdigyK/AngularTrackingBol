import { baseUrl } from './../environments/environment';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient){ }
  
  login(data: FormGroup):Observable<any>{
    return this.http.post(`${baseUrl}login-0.0.1/login/validar/`, data);
  }
}
