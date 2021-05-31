import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../shared/services/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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

  public register(): void {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    if(username && password){
      this.authService.register(username, password).then(response => {
        this.snackbar.open('Registration Successful');
        this.router.navigate(['/login']);
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
