import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
