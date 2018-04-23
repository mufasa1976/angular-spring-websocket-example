import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login.component';
import {MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {AuthenticationGuard} from "./guards/authentication-guard.service";
import {AuthenticationRoutingModule} from "./authentication-routing.module";

const declarations = [
  LoginComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthenticationRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule
  ],
  declarations: declarations,
  exports: declarations,
  providers: [AuthenticationGuard]
})
export class AuthenticationModule {
}
