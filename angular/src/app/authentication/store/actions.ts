import {Credentials} from '../shared';
import {User} from '../../shared';
import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';

export enum AuthenticationActionTypes {
  LOGIN = 'AUTHENTICATION_LOGIN',
  LOGIN_SUCCESS = 'AUTHENTICATION_LOGIN_SUCCESS',
  LOGIN_FAILED = 'AUTHENTICATION_LOGIN_FAILED',
  LOGOUT = 'AUTHENTICATION_LOGOUT',
  LOGGED_OUT = 'AUTHENTICATION_LOGGED_OUT'
}

export class LoginAction implements Action {
  readonly type: string = AuthenticationActionTypes.LOGIN;

  constructor(public payload: Credentials) {}
}

export class LoginSuccessAction implements Action {
  readonly type: string = AuthenticationActionTypes.LOGIN_SUCCESS;

  constructor(public payload: User) {}
}

export class LoginFailedAction implements Action {
  readonly type: string = AuthenticationActionTypes.LOGIN_FAILED;

  constructor(public payload: HttpErrorResponse) {}
}

export class LogoutAction implements Action {
  readonly type: string = AuthenticationActionTypes.LOGOUT;
}

export class LoggedOutAction implements Action {
  readonly type: string = AuthenticationActionTypes.LOGGED_OUT;
}

export type AuthenticationActions = LoginAction | LoginSuccessAction | LoginFailedAction | LogoutAction | LoggedOutAction;
