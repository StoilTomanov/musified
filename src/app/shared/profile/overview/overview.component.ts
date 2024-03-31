import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { IUser } from 'src/app/interfaces';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
    userData: IUser | undefined;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userService.readUser$().subscribe((data) => this.userData = data);
    }
}
