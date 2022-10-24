import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DatabaseService } from '../app/service/database.service';
import { appRoutingModule } from './app-routing.module';
import { JwtInterceptor } from '../app/helpers/jwt.interceptor';
import { ErrorInterceptor } from '../app/helpers/error.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { AlertComponent } from '../app/components/alert.component';
import { AuthenticationService } from '../app/service/authentication.service';
import { UserService } from '../app/service/user.service';
import { HttpClientService } from '../app/service/http-client.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table' ;
import {MatPaginatorModule} from '@angular/material/paginator';
 import { TableSummaryComponent } from '../app/dashboard/view-logged-expenses/table-summary/table-summary.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
//import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTableModule ,
    MatPaginatorModule,
    MatCardModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        TableSummaryComponent,
    ],
    providers: [
        AuthenticationService,
        UserService,
        HttpClientService,
        DatabaseService,
        MatDatepickerModule,
        MatNativeDateModule,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }

    ],
    bootstrap: [AppComponent]
})
export class AppModule { };