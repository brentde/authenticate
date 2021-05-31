import { UserService } from './../../shared/services/user/user.service';
import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public form: FormGroup;

  constructor(private authService: AuthService,
              private userService: UserService,
              private snackbar: MatSnackBar) {
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
      this.authService.login(username, password).then(response => {
        this.snackbar.open('Login Successful');
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
