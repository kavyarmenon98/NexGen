import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserListItemComponent } from './chat-user-list-item.component';

describe('ChatUserListItemComponent', () => {
  let component: ChatUserListItemComponent;
  let fixture: ComponentFixture<ChatUserListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatUserListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUserListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
