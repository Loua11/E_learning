import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProgramComponent } from './all-program.component';

describe('AllProgramComponent', () => {
  let component: AllProgramComponent;
  let fixture: ComponentFixture<AllProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
