import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
