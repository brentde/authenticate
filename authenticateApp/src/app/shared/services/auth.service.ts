import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    this.testRoute();
   }

  private testRoute(): void{
    this.http.get('/api/config').subscribe(config => {
      console.log(config);
    });
  }
}
