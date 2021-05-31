import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface authError {
  field: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private userService: UserService) {}

  public login(username: string, password: string): Promise<authError|null> {
    return new Promise((resolve, reject) => {
      this.http.post('/api/user/auth/login', {
        params: {
          username: username,
          password: password
        }
      })
      .toPromise()
      .then(token => {
        // Add cookie with token here
        this.userService.loggedIn = true;
        resolve(null);
      }, errField => {
        reject({field: errField});
      })
    })
  }

  public logout(): void {

  }

  public register(username: string, password: string): Promise<authError|null> {
    return new Promise((resolve, reject) => {
      this.http.post('/api/user/register', {
        username: username,
        password: password
      })
      .toPromise()
      .then(response => {
        resolve(null);
      }, errField => {
        reject({field: errField});
      })
    })
  }

}
