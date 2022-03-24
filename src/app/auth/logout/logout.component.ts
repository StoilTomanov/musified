import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  isLogged: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {
    this.isLogged = false;
  }
  
}
