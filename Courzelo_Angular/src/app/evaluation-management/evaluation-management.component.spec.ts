import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationManagementComponent } from './evaluation-management.component';

describe('EvaluationManagementComponent', () => {
  let component: EvaluationManagementComponent;
  let fixture: ComponentFixture<EvaluationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
