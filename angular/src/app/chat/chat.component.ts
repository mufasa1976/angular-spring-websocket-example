import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location, PlatformLocation} from '@angular/common';
import {StompRService} from '@stomp/ng2-stompjs';
import {CookieService} from "ngx-cookie-service";
import {StompHeaders} from "@stomp/ng2-stompjs/src/stomp-headers";

@Component({
  selector: 'app-chat',
  template: ``,
  styles: [``]
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(private platformLocation: PlatformLocation,
              private stompClient: StompRService,
              private cookieService: CookieService) { }

  ngOnInit() {
    let websocketUrl =
      Location.joinWithSlash((this.platformLocation as any).location.href, 'api/websocket-connect');
    websocketUrl = websocketUrl.replace('http://', 'ws://');
    websocketUrl = websocketUrl.replace('https://', 'wss://');
    this.stompClient.config = {
      url: websocketUrl,
      headers: this.getStompHeaders(),
      debug: true,
      heartbeat_in: 0,
      heartbeat_out: 20 * 1000,
      reconnect_delay: 5 * 1000
    };
    this.stompClient.initAndConnect();
  }

  private getStompHeaders(): StompHeaders {
    let headers: StompHeaders = {};
    if (this.cookieService.check("XSRF-TOKEN")) {
      headers = {
        ...headers,
        'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
      };
    }
    return headers;
  }

  ngOnDestroy(): void {
    if (this.stompClient.connected()) {
      this.stompClient.disconnect();
    }
  }

}
