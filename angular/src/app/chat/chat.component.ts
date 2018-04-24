import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import {StompService} from '../services/stomp.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  private subscription: Subscription;

  messages: string[] = [];

  @ViewChild('chatMessages')
  private chatMessageWindow: ElementRef;

  constructor(private stompService: StompService) { }

  ngAfterViewInit(): void {
    this.subscription = this.stompService.subscribeToChat()
      .subscribe(chatMessage => {
        this.messages.push(chatMessage);
      });
  }

  ngAfterViewChecked(): void {
    this.chatMessageWindow.nativeElement.scrollTop = this.chatMessageWindow.nativeElement.scrollHeight;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
