import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackbar: MatSnackBar, private router: Router, private authService: AuthServiceService) { 
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  ingresar() {
    
    console.log(this.form)
    if(this.form.valid){
      this.authService.login(this.form.value).subscribe(
        result =>{
          if(result.success){
            console.log(result);
            this.reLoading()
          }

        }
      )
    }
    
    
    /*
    const usuario = this.form.value.usuario;
    const password = this.form.value.contrasena;

    if(usuario == 'luis1' && password == 'admin123'){
      this.reLoading()

    } else {
      this.error()
      this.form.reset()
      
    }
    */
  }

  error() {
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
