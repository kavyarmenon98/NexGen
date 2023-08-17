import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageBubbleComponent } from './chat-message-bubble.component';

describe('ChatMessageBubbleComponent', () => {
  let component: ChatMessageBubbleComponent;
  let fixture: ComponentFixture<ChatMessageBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMessageBubbleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
