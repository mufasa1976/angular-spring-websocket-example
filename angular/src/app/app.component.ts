import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from './store';
import {Observable} from 'rxjs/Observable';
import {AuthenticationState} from './authentication/store/reducers';
import {LogoutAction} from './authentication/store/actions';

@Component({
  selector: 'app-root',
  template: `
    <app-login *ngIf="(authentication$ | async).state != 'LOGGED_IN'; else loggedIn"></app-login>
    <ng-template #loggedIn>
      <mat-toolbar color="primary">
        <mat-toolbar-row>
          <span>{{(authentication$ | async)?.user?.displayname}}</span>
          <span class="spacer"></span>
          <button mat-icon-button (click)="logout()"><mat-icon>power_settings_new</mat-icon></button>
        </mat-toolbar-row>
      </mat-toolbar>
      <app-chat></app-chat>
    </ng-template>
  `,
  styles: [
      `.spacer {
      flex: 1 1 auto
    }`
  ]
})
export class AppComponent {
  authentication$: Observable<AuthenticationState>;

  constructor(private store: Store<State>) {
    this.authentication$ = store.select('authentication');
  }

  logout(): void {
    this.store.dispatch(new LogoutAction());
  }
}
