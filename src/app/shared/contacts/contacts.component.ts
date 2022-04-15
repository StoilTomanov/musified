import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  isAdmin!: string;
  constructor() { }

  ngOnInit(): void {
    this.isAdmin = sessionStorage['isAdmin'];
  }

}
