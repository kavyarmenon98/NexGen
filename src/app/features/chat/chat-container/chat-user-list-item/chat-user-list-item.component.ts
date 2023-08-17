import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ChatUser } from 'src/app/features/chat/store/entities/chat-user/chat-user.model';
import { ThemeService } from 'src/app/services/theme.service';
import { CommonStatic } from 'src/app/shared/utils/common-static';

@UntilDestroy()
@Component({
  selector: 'app-chat-user-list-item',
  templateUrl: './chat-user-list-item.component.html',
  styleUrls: ['./chat-user-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatUserListItemComponent implements OnInit {
  private _user: ChatUser;
  public get user(): ChatUser {
    return this._user;
  }
  @Input()
  public set user(value: ChatUser) {
    this._user = value;
    // let ref: Subscription = null;

    // if (value) {
    //   if (ref) {
    //     ref.unsubscribe();
    //   }
    //   ref = this.store$
    //     .pipe(untilDestroyed(this), select(selectLatestMsg(value.employeeCode)))
    //     .subscribe((value) => {
    //       this.latestMsg = value;
    //       this.cdr.detectChanges();
    //     });
    // }
  }

  constructor(
    private store$: Store,
    private cdr: ChangeDetectorRef,
    public themeService: ThemeService
  ) {}

  getImageUrl() {
    return CommonStatic.getImageUrl(
      this.user ? (this.user.profileImage ? this.user.profileImage : '') : ''
    );
  }

  ngOnInit(): void {}
}
