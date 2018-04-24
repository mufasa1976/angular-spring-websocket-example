import {Injectable, OnDestroy} from '@angular/core';
import {StompRService} from "@stomp/ng2-stompjs";
import {Store} from "@ngrx/store";
import {State} from "../store";
import {Subscription} from "rxjs/Subscription";
import {LoginState} from "../authentication/shared";
import {CookieService} from "ngx-cookie-service";
import {Location, PlatformLocation} from "@angular/common";
import {StompHeaders} from "@stomp/ng2-stompjs/src/stomp-headers";
import {Observable} from "rxjs/Observable";
import {Message} from '@stomp/stompjs';
import {EmptyObservable} from "rxjs/observable/EmptyObservable";

@Injectable()
export class StompService implements OnDestroy {

  private readonly subscription: Subscription;

  constructor(private stompService: StompRService,
              platformLocation: PlatformLocation,
              store: Store<State>,
              cookieService: CookieService) {
    this.subscription = store.select('authentication')
      .subscribe(authentication =>
        this.changeStompServiceState(authentication.state, platformLocation, stompService, cookieService));
  }

  private changeStompServiceState(loginState: LoginState,
                                  platformLocation: PlatformLocation,
                                  stompService: StompRService,
                                  cookieService: CookieService): void {
    if (loginState === LoginState.LOGGED_IN && !stompService.connected()) {
      let websocketUrl =
        Location.joinWithSlash((platformLocation as any).location.href, 'api/websocket-connect');
      websocketUrl = websocketUrl.replace('http://', 'ws://');
      websocketUrl = websocketUrl.replace('https://', 'wss://');
      let headers: StompHeaders = {};
      if (cookieService.check("XSRF-TOKEN")) {
        headers = {
          ...headers,
          'X-XSRF-TOKEN': cookieService.get('XSRF-TOKEN')
        };
      }
      stompService.config = {
        url: websocketUrl,
        headers: headers,
        debug: true,
        heartbeat_in: 0,
        heartbeat_out: 20 * 1000,
        reconnect_delay: 5 * 1000
      };
      stompService.initAndConnect();
    }

    if (loginState !== LoginState.LOGGED_IN && stompService.connected()) {
      stompService.disconnect();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  subscribe(queueName: string, headers?: StompHeaders): Observable<Message> {
    if (!this.stompService.connected()) {
      return new EmptyObservable<Message>();
    }
    this.stompService.subscribe(queueName, headers);
  }

  disconnect(): void {
    if (this.stompService.connected()) {
      this.stompService.disconnect();
    }
  }
}
