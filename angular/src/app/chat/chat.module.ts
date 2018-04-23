import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat.component';
import {ChatViewComponent} from './chat-view.component';
import {FormsModule} from '@angular/forms';
import {StompRService} from '@stomp/ng2-stompjs';
import {CookieService} from "ngx-cookie-service";

const declarations = [
  ChatComponent,
  ChatViewComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: declarations,
  exports: declarations,
  providers: [
    StompRService,
    CookieService
  ]
})
export class ChatModule {}
