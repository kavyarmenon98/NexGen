import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { isEqual } from 'lodash-es';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { ChatMessageActions } from 'src/app/features/chat/store/chat-action-types';
import { ChatMessage } from 'src/app/features/chat/store/entities/chat-message/chat-message.model';
import {
  selectAllChatMessagesOrderByTime,
  selectChatMessageState,
} from 'src/app/features/chat/store/entities/chat-message/chat-message.selectors';
import { ChatUser } from 'src/app/features/chat/store/entities/chat-user/chat-user.model';
import {
  selectMyChatDetails,
  selectSelectedChatUser,
} from 'src/app/features/chat/store/entities/chat-user/chat-user.selectors';
import { HomeDrawerActions } from 'src/app/features/home/store/home-action-types';
import { CommonStatic } from 'src/app/shared/utils/common-static';

@UntilDestroy()
@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent implements OnInit {
  @ViewChild(PerfectScrollbarComponent) scrollbar: PerfectScrollbarComponent;
  @ViewChild('input') inputRef: ElementRef;

  selectedChatUser: ChatUser;

  myChatDetails: ChatUser;

  chatMessages: ChatMessage[] = [];

  messageControl = new FormControl();

  isLoading = false;

  constructor(private store$: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store$
      .pipe(
        untilDestroyed(this),
        select(selectMyChatDetails),
        distinctUntilChanged((a, b) => isEqual(a, b))
      )
      .subscribe((value) => {
        this.myChatDetails = value;
        this.cdr.detectChanges();
      });

    let ref: Subscription = null;

    this.store$
      .pipe(
        untilDestroyed(this),
        select(selectChatMessageState),
        distinctUntilChanged((a, b) => isEqual(a, b))
      )
      .subscribe((state) => {
        this.isLoading = state.isLoading;
        this.cdr.detectChanges();
        this.scrollDown();
      });

    this.store$
      .pipe(
        untilDestroyed(this),
        select(selectSelectedChatUser),
        distinctUntilChanged((a, b) => isEqual(a, b))
      )
      .subscribe((user) => {
        this.selectedChatUser = user;

        if (user) {
          this.chatMessages.length = 0;

          // Set focus to input for typing messages
          if (this.inputRef) {
            (this.inputRef.nativeElement as HTMLElement).focus();
          }

          if (ref) {
            ref.unsubscribe();
          }

          ref = this.store$
            .select(
              selectAllChatMessagesOrderByTime(user.id),
              distinctUntilChanged((a, b) => isEqual(a, b))
            )
            .subscribe((values) => {
              this.chatMessages = values;
              this.cdr.detectChanges();
              this.scrollDown();
            });
        }
        this.cdr.detectChanges();
      });
  }

  scrollDown() {
    if (this.scrollbar) {
      setTimeout(() => {
        // Scrolldown
        this.scrollbar.directiveRef.update();
        this.cdr.detectChanges();
        this.scrollbar.directiveRef.scrollToBottom(0, 100);
      }, 50);
    }
  }

  getImageUrl(pic) {
    return CommonStatic.getImageUrl(pic ? pic : '');
  }

  sendMessage() {
    const msg = this.messageControl.value;
    this.store$.pipe(take(1)).subscribe((value) => {
      if (value) {
        this.store$.dispatch(
          ChatMessageActions.sendChatMessage({
            message: {
              fromUserId: CommonStatic.getUserId(),
              toUserId: this.selectedChatUser.id,
              message: msg,
            },
          })
        );

        this.messageControl.patchValue(null);
      }
    });
  }

  trackByMsg(index: number, msg: ChatMessage) {
    return msg.id;
  }

  handleClose() {
    this.store$.dispatch(HomeDrawerActions.closeRightDrawer());
    this.store$.dispatch(HomeDrawerActions.clearComponentToShow());
  }
}
