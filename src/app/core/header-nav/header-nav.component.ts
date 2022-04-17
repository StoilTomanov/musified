import { Component, AfterContentChecked, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  messageData!: any[];
  serviceIsAdmin!: string;

  constructor(
    private userService: UserService,
    private storage: AuthHandlerService,
    private router: Router
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
    this.userService.getAllMessages$(sessionStorage['userId'])
      .subscribe(data => this.messageData = data)
    this.userService.readUser$()
      .subscribe(data => this.serviceIsAdmin = data.isAdmin)

    setTimeout(() => {
      if (this.serviceIsAdmin == 'true') {
        sessionStorage['isAdmin'] = 'true';
        this.isAdmin = 'true';
      } else {
        sessionStorage['isAdmin'] = 'false';
        this.isAdmin = 'false';
      }
    }, 100);
  }

  ngAfterContentChecked(): void {
    if (sessionStorage['username'] && sessionStorage['accessToken']) {
      this.isLogged = true;
      this.username = sessionStorage['username']
    } else {
      this.isLogged = false;
    }
  }

  onMessages(): void {
    this.router.navigate(['messages']);
  }

}
