import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
  isLogged: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {
    this.isLogged = false;
  }

  login(): void {
    this.isLogged = true;
  }

}
