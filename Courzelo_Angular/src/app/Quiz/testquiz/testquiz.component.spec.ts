import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestquizComponent } from './testquiz.component';

describe('TestquizComponent', () => {
  let component: TestquizComponent;
  let fixture: ComponentFixture<TestquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestquizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
