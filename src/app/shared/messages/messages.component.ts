import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messageData!: any[];
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getAllMessages$(sessionStorage['userId'])
      .subscribe(data => {
        this.messageData = data;
      })

  }

  onReply(): void {
    if (sessionStorage['isAdmin'] == 'true') {
      this.userService.deleteMessageForAdmin$(sessionStorage['userId'])
        .subscribe();
    }
    this.router.navigate(['contacts']);
  }
}
