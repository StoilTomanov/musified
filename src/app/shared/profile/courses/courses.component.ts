import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { IUser } from 'src/app/interfaces';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  userData!: IUser

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.readUser$()
    .subscribe(data => this.userData = data);
  }

}
