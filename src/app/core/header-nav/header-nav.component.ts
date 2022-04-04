import { Component, AfterContentChecked } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements AfterContentChecked {
  isLogged: boolean = false;

  username!: string;

  constructor(private userService: UserService) { }

  logout(): void {
    this.userService.logout$()
      .subscribe()
    this.isLogged = false;
    return;
  }

  ngAfterContentChecked(): void {
    if (sessionStorage['username'] && sessionStorage['accessToken']) {
      this.isLogged = true;
      this.username = sessionStorage['username']
    } else {
      this.isLogged = false;
    }
  }

}
