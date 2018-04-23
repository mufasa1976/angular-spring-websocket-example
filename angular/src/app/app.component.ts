import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from './store';
import {Observable} from 'rxjs/Observable';
import {AuthenticationState} from './authentication/store/reducers';

@Component({
  selector: 'app-root',
  template: `
    <app-login *ngIf="(authentication$ | async).state != 'LOGGED_IN'; else loggedIn"></app-login>
    <ng-template #loggedIn>
      <mat-toolbar color="primary">
        <mat-toolbar-row>
          <span>{{(authentication$ | async)?.user?.displayname}}</span>
          <span class="spacer"></span>
        </mat-toolbar-row>
      </mat-toolbar>
      <router-outlet></router-outlet>
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

  constructor(store: Store<State>) {
    this.authentication$ = store.select('authentication');
  }
}
