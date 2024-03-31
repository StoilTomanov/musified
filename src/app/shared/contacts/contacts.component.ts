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
    @ViewChild('messageForm') form: NgForm | undefined;

    isAdmin: string | undefined;

    constructor(
        private userService: UserService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.isAdmin = sessionStorage['isAdmin'];
    }

    onMessageSubmit(): void {
        if (!this.form) { return; }

        const messageData = this.form.value;
        const userId = sessionStorage['userId'];

        this.userService.createMessageForAdmin$(userId, messageData).subscribe();
        this.router.navigate(['explore']);
    }

}
