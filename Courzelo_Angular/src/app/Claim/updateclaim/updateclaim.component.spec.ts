import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateclaimComponent } from './updateclaim.component';

describe('UpdateclaimComponent', () => {
  let component: UpdateclaimComponent;
  let fixture: ComponentFixture<UpdateclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateclaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
