import {AuthenticationActions, AuthenticationActionTypes, LoginAction, LoginFailedAction, LoginSuccessAction} from './actions';
import {User} from '../../shared';
import {Credentials, LoginState} from '../shared';
import {HttpErrorResponse} from '@angular/common/http';

export interface AuthenticationState {
  state: LoginState,
  credentials: Credentials,
  user: User,
  loginError: HttpErrorResponse
}

const initialState: AuthenticationState = {
  state: LoginState.LOGGED_OUT,
  credentials: undefined,
  user: undefined,
  loginError: undefined
};

export function reducer(state: AuthenticationState = initialState,
                        action: AuthenticationActions): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionTypes.LOGIN:
      return {
        ...state,
        state: LoginState.LOGIN_IN_PROGRESS,
        credentials: (action as LoginAction).payload,
        loginError: undefined,
      };
    case AuthenticationActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        state: LoginState.LOGGED_IN,
        user: (action as LoginSuccessAction).payload,
        credentials: new Credentials(state.credentials.username)
      };
    case AuthenticationActionTypes.LOGIN_FAILED:
      return {
        ...state,
        credentials: new Credentials(),
        state: LoginState.LOGIN_FAILED,
        loginError: (action as LoginFailedAction).payload
      };
    case AuthenticationActionTypes.LOGOUT:
      return {
        ...state,
        state: LoginState.LOGOUT_IN_PROGRESS
      };
    case AuthenticationActionTypes.LOGGED_OUT:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
