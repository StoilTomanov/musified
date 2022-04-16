import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  isAdmin!: string;
  @ViewChild('messageForm') form!: NgForm;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isAdmin = sessionStorage['isAdmin'];
  }

  onMessageSubmit(): void {
    const messageData = this.form.value;
    this.userService.createMessageForAdmin$(sessionStorage['userId'], messageData)
      .subscribe();
    this.router.navigate(['explore']);
  }

}
