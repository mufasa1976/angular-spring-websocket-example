import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {AuthenticationActionTypes, LoginAction, LoginFailedAction, LoginSuccessAction} from './actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {User} from '../../shared';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AuthenticationEffects {

  constructor(private http: HttpClient,
              private actions$: Actions,
              private snackbar: MatSnackBar) { }

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LOGIN),
    mergeMap((action: LoginAction) =>
      this.http.get<User>('/api/login', {
        headers: new HttpHeaders({
          Authorization: action.payload.basicAuth()
        })
      }).pipe(
        map(user => new LoginSuccessAction(user)),
        catchError((error: HttpErrorResponse) => {
          this.snackbar.open('Login failed', null, {
            duration: 3000
          });
          return of(new LoginFailedAction(error));
        })
      )
    ));
}
