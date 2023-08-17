import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppreciationContainerComponent } from './appreciation-container.component';

describe('AppreciationContainerComponent', () => {
  let component: AppreciationContainerComponent;
  let fixture: ComponentFixture<AppreciationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppreciationContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppreciationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
