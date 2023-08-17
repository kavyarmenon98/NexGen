import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { isEqual } from 'lodash-es';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { ChatMessageActions, ChatUserActions } from 'src/app/features/chat/store/chat-action-types';
import { ChatUser } from 'src/app/features/chat/store/entities/chat-user/chat-user.model';
import {
  selectAllChatUserExceptMe,
  selectMyChatDetails,
  selectSelectedChatUser,
} from 'src/app/features/chat/store/entities/chat-user/chat-user.selectors';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-chat-users-list',
  templateUrl: './chat-users-list.component.html',
  styleUrls: ['./chat-users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatUsersListComponent implements OnInit {
  chatUsers$ = this.store$.select(selectAllChatUserExceptMe);
  selectedChatUserControl = new FormControl();

  selectedUser: ChatUser;

  constructor(private store$: Store, public themeService: ThemeService) {}

  ngOnInit(): void {
    this.selectedChatUserControl.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged((a, b) => isEqual(a, b))
      )
      .subscribe((value) => {
        if (value) {
          this.store$.dispatch(
            ChatUserActions.setSelectedChatUserById({
              id: value,
            })
          );
          this.store$.dispatch(
            ChatUserActions.setSelectedChatUserById({
              id: value,
            })
          );
          this.selectedChatUserControl.patchValue(null);
        }
      });

    this.store$
      .pipe(untilDestroyed(this), select(selectSelectedChatUser))
      .subscribe((value) => {
        this.selectedUser = value;
      });
  }

  setSelectedChatUser(user: ChatUser) {
    this.store$.dispatch(
      ChatUserActions.setSelectedChatUser({
        chatUser: user,
      })
    );

    this.store$.pipe(select(selectMyChatDetails), take(1)).subscribe((me) => {
      this.store$.dispatch(
        ChatMessageActions.getChatMessages({
          fromId: me.id,
          toId: this.selectedUser.id,
        })
      );
    });
  }

  isSelected(user: ChatUser) {
    if (user && this.selectedUser) {
      if (user.id === this.selectedUser.id) {
        return this.themeService.lightBlueBackgroundColor;
      } else {
        return 'inherit';
      }
    }

    return 'inherit';
  }

  trackByUsers(index: number, user: ChatUser) {
    return user.id;
  }
}
