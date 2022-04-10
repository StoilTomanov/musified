import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { IUser } from 'src/app/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData!: IUser;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.readUser$()
    .subscribe(data => this.userData = data);
  }

}
