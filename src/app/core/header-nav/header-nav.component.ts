import { Component, AfterContentChecked, OnInit } from '@angular/core';
import { AuthHandlerService } from 'src/app/auth-handler.service';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements AfterContentChecked, OnInit {
  isLogged: boolean = false;
  isAdmin!: string;
  username!: string;

  constructor(
    private userService: UserService,
    private storage: AuthHandlerService
  ) { }

  logout(): void {
    if (sessionStorage['accessToken']) {
      this.userService.logout$()
        .subscribe()
      this.isLogged = false;
      return;
    }
  }

  ngOnInit(): void {

  }

  ngAfterContentChecked(): void {
    if (sessionStorage['username'] && sessionStorage['accessToken']) {
      this.isLogged = true;
      this.username = sessionStorage['username']
    } else {
      this.isLogged = false;
    }
    const result = this.storage.getStorage();
    if (result['isAdmin']) {
      this.isAdmin = result['isAdmin'];
    }
  }

}
