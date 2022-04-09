import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchLessonComponent } from './watch-lesson.component';

describe('WatchLessonComponent', () => {
  let component: WatchLessonComponent;
  let fixture: ComponentFixture<WatchLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
