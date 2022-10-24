import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../app/service/authentication.service';
import { User } from '../app/models/user';

//import '../app/content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser1.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}