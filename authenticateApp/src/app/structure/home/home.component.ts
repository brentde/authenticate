import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public boyImage: any = undefined;

  constructor(private userService: UserService) { 
    this.userService.getBoyImage().subscribe(img => {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.boyImage = event.target.result;
        console.log(this.boyImage);
      }

      reader.readAsDataURL(img);
    }, error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
  }

}
