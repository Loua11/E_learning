import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLessonComponent } from './all-lesson.component';

describe('AllLessonComponent', () => {
  let component: AllLessonComponent;
  let fixture: ComponentFixture<AllLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLessonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
