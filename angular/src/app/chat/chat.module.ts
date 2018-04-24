import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat.component';
import {FormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material';

const declarations = [
  ChatComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
  ],
  declarations: declarations,
  exports: declarations
})
export class ChatModule {}
