import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EventEmitter } from '@angular/core';

interface authError {
  field: string
};

interface token {
  token: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
              private cookies: CookieService) {}

  public login(username: string, password: string): Promise<authError|null> {
    return new Promise((resolve, reject) => {
      this.http.get<token>('/api/user/login', {
        params: {
          username: username,
          password: password
        }
      })
      .toPromise()
      .then(response => {
        this.cookies.set('token', JSON.stringify(response.token));
        this.updateLoggedIn(true);
        resolve(null);
      }, errField => {
        reject({field: errField});
      })
    })
  }

  public logout(): void {
    this.updateLoggedIn(false);
    this.cookies.delete('token');
  }

  public register(username: string, password: string): Promise<authError|null> {
    return new Promise((resolve, reject) => {
      this.http.post('/api/user/register', {
        username: username,
        password: password
      })
      .toPromise()
      .then(() => {
        resolve(null);
      }, errField => {
        reject({field: errField});
      })
    })
  }

  public updateLoggedIn(status: boolean): void {
    this.loggedIn.emit(status);
  }
}
