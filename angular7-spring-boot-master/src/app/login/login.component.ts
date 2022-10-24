import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../service/alert.service';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: UntypedFormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private httpClient:HttpClient
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(               
                data => {
                   // console.log("123" + this.returnUrl);
                   if(localStorage.getItem('currentUser') != null )
                   {
                    this.router.navigate([this.returnUrl]);
                   }
                   else
                   {
                    this.returnUrl  = "/login";
                    this.router.navigate(['/login']);
                   }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}