import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppreciationComponent } from './new-appreciation.component';

describe('NewAppreciationComponent', () => {
  let component: NewAppreciationComponent;
  let fixture: ComponentFixture<NewAppreciationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAppreciationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppreciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
