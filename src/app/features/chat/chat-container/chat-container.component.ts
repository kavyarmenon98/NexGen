import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { ChatUserActions } from 'src/app/features/chat/store/chat-action-types';
import { HomeUIActions } from 'src/app/features/home/store/home-action-types';
import { selectPageTitle } from 'src/app/features/home/store/selectors/home-ui.selectors';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatContainerComponent implements OnInit, OnDestroy {
  previousTitle = '';
  constructor(public themeService: ThemeService, private store$: Store) {}

  ngOnInit(): void {
    this.store$.pipe(select(selectPageTitle), take(1)).subscribe((value) => {
      this.previousTitle = value;

      this.store$.dispatch(
        HomeUIActions.setPageTitle({
          title: 'Chat',
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.store$.dispatch(ChatUserActions.clearSelectedChatUser());

    this.store$.dispatch(
      HomeUIActions.setPageTitle({
        title: this.previousTitle,
      })
    );
  }
}
