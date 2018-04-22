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
      I am logged in
    </ng-template>
  `
})
export class AppComponent {
  private authentication$: Observable<AuthenticationState>;

  constructor(store: Store<State>) {
    this.authentication$ = store.select('authentication');
  }
}
