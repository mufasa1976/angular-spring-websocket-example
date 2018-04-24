import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat.component';
import {ChatViewComponent} from './chat-view.component';
import {FormsModule} from '@angular/forms';

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
  exports: declarations
})
export class ChatModule {}
