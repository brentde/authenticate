import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): void {
    this.http.get('/api/auth/login', {
      params: {
        username: username,
        password: password
      }
    }).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }
}
