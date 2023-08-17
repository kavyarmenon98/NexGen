import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChatMessageEffects } from 'src/app/features/chat/store/entities/chat-message/chat-message.effects';
import { ChatUserEffects } from 'src/app/features/chat/store/entities/chat-user/chat-user.effects';
import { SignalrService } from 'src/app/services/signalr.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ChatMessageBubbleComponent } from './chat-container/chat-message-bubble/chat-message-bubble.component';
import { ChatUserListItemComponent } from './chat-container/chat-user-list-item/chat-user-list-item.component';
import { ChatUsersListComponent } from './chat-container/chat-users-list/chat-users-list.component';
import { ChatWindowComponent } from './chat-container/chat-window/chat-window.component';
import { ChatRoutingModule } from './chat-routing.module';
import * as fromChat from './store';

const importExport = [];

@NgModule({
  declarations: [
    ChatContainerComponent,
    ChatUsersListComponent,
    ChatWindowComponent,
    ChatUserListItemComponent,
    ChatMessageBubbleComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    importExport,
    SharedModule,
    StoreModule.forFeature(fromChat.chatFeatureKey, fromChat.reducers, {
      metaReducers: fromChat.metaReducers,
    }),
    EffectsModule.forFeature([ChatMessageEffects, ChatUserEffects]),
  ],
  exports: [
    importExport,
    ChatContainerComponent,
    ChatUsersListComponent,
    ChatWindowComponent,
    ChatUserListItemComponent,
  ],
  providers: [SignalrService],
})
export class ChatModule {}
