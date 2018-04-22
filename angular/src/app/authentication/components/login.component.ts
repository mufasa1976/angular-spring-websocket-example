import {Component} from '@angular/core';
import {Credentials} from '../shared';
import {Store} from '@ngrx/store';
import {State} from '../../store';
import {LoginAction} from '../store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = new Credentials();

  constructor(private store: Store<State>) { }

  login() {
    this.store.dispatch(new LoginAction(this.credentials));
    this.credentials = new Credentials();
  }
}
