import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import {StompService} from '../services/stomp.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  private subscription: Subscription;
  private writeSubscription: Subscription;

  messages: string[] = [];

  @ViewChild('chatMessages')
  private chatMessageWindow: ElementRef;

  constructor(private stompService: StompService) { }

  ngOnInit(): void {
    this.writeSubscription = Observable.timer(0, 5000)
      .subscribe(() => this.stompService.writeMessage('some Message from Client'));
  }

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
    if (this.writeSubscription) {
      this.writeSubscription.unsubscribe();
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
