import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '@stomp/stompjs';
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/operator/map";
import {StompService} from "../services/stomp.service";

@Component({
  selector: 'app-chat',
  template: ``,
  styles: [``]
})
export class ChatComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private stompService: StompService) { }

  ngOnInit() {
    let that = this;
    setTimeout(function () {
      that.subscription = that.stompService.subscribe("/websocket/topic/chat")
        .map((message: Message) => message.body)
        .subscribe(chatMessage => console.info(chatMessage));
    }, 100);
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
