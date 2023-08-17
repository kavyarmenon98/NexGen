import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { DateTime } from 'luxon';
import { ChatMessage } from 'src/app/features/chat/store/entities/chat-message/chat-message.model';
import { ChatUser } from 'src/app/features/chat/store/entities/chat-user/chat-user.model';
import { selectMyChatDetails } from 'src/app/features/chat/store/entities/chat-user/chat-user.selectors';
import { CommonStatic } from 'src/app/shared/utils/common-static';

@UntilDestroy()
@Component({
  selector: 'app-chat-message-bubble',
  templateUrl: './chat-message-bubble.component.html',
  styleUrls: ['./chat-message-bubble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageBubbleComponent implements OnInit {
  @Input() image = '';
  @Input() msg: ChatMessage;
  myChatDetails: ChatUser;

  get isCurrentUser() {
    if (this.myChatDetails && this.msg) {
      if (this.msg.fromUserId === this.myChatDetails.id) {
        return true;
      }
    }
    return false;
  }

  constructor(private store$: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store$
      .pipe(untilDestroyed(this), select(selectMyChatDetails))
      .subscribe((value) => {
        this.myChatDetails = value;
        this.cdr.detectChanges();
      });
  }

  getTime() {
    if (!this.msg) {
      return null;
    }
    return DateTime.fromMillis(this.msg.dateTime).toFormat(
      'dd-MM-yyyy hh:mm a'
    );
  }

  getImageUrl(pic) {
    return CommonStatic.getImageUrl(pic ? pic : '');
  }
}
