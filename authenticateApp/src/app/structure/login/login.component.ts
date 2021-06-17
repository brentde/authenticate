import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public form: FormGroup;

  constructor(private authService: AuthService,
              private snackbar: MatSnackBar,
              private router: Router) {
               
                this.form = new FormGroup({
                  username: new FormControl(''),
                  password: new FormControl('')
                });
               
              }

  ngOnInit(): void {}


  public login(): void {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    if(username && password){
      this.authService.login(username, password).then(() => {
        this.snackbar.open('Login Successful', undefined, {duration: 5000});
        this.router.navigate(['/home']);
      }, error => {
        this.setError(error.field, 'invalid');
      })
    } else if(!username){
      this.setError('username', 'invalid');
    } else {
      this.setError('password', 'invalid');
    }
  }

  public setError(field: string, error: string) {
      this.form.get(field)?.setErrors({error: true}, {emitEvent: false});
  }
}
