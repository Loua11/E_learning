import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowclaimComponent } from './showclaim.component';

describe('ShowclaimComponent', () => {
  let component: ShowclaimComponent;
  let fixture: ComponentFixture<ShowclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowclaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
