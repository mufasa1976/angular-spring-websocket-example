import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location, PlatformLocation} from '@angular/common';
import {StompRService} from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-chat',
  template: ``,
  styles: [``]
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(private platformLocation: PlatformLocation,
              private stompClient: StompRService) { }

  ngOnInit() {
    let websocketUrl =
      Location.joinWithSlash((this.platformLocation as any).location.href, 'api/websocket-connect');
    websocketUrl = websocketUrl.replace('http://', 'ws://');
    websocketUrl = websocketUrl.replace('https://', 'wss://');
    console.info(websocketUrl);
    this.stompClient.config = {
      url: websocketUrl,
      headers: {},
      debug: true,
      heartbeat_in: 0,
      heartbeat_out: 20 * 1000,
      reconnect_delay: 5 * 1000
    };
    this.stompClient.initAndConnect();
  }

  ngOnDestroy(): void {
    if (this.stompClient.connected()) {
      this.stompClient.disconnect();
    }
  }

}
