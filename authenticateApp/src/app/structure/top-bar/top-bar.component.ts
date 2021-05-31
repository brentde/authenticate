import { AuthService } from './../../shared/services/auth/auth.service';
import { UserService } from './../../shared/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(public userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {}

  public logout(): void {
    this.authService.logout();
  }
}
