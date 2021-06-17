import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;
  public subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService,
              private router: Router) {
    this.subscriptions.add(this.authService.loggedIn.subscribe(status => {
      this.isLoggedIn = status;
    }));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
