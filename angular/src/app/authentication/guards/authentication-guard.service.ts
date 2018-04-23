import {Injectable, OnDestroy} from '@angular/core';
import {CanActivate} from "@angular/router";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {Subscription} from "rxjs/Subscription";
import {LoginState} from "../shared";

@Injectable()
export class AuthenticationGuard implements CanActivate, OnDestroy {

  private subscription: Subscription;
  private state: LoginState = LoginState.LOGGED_OUT;

  constructor(private store: Store<State>) {
    this.subscription = store.select('authentication')
      .subscribe(authentication => this.state = authentication.state);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.state != LoginState.LOGGED_IN) {
      return false;
    }
    return true;
  }

}
