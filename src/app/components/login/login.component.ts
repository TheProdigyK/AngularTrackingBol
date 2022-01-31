import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginI } from '../../models/login.interface'
import { UserI } from '../../models/user.interface'
import { VehiclesService } from 'src/app/services/vehicles.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackbar: MatSnackBar, 
    private router: Router, private authService: AuthService, private vehiclesService: VehiclesService) { 
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    
  }

  onLogin(data:LoginI){
    
    this.authService.login(data).subscribe(
      (data) => {
        console.log(data);
        if(data.codigo == 0){
          this.vehiclesService.apikey.emit(data);
          this.reLoading()
        }
      },
      (error) => {
        console.log(error);
        this.error_message()
      },
    );
  }

  error_message() {
    this._snackbar.open('Usuario o contraseña incorrecto!', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  reLoading() {
    this.loading = true;
    setTimeout(() =>{
      this.router.navigate(['dashboard'])
    },1500)
  }

}
