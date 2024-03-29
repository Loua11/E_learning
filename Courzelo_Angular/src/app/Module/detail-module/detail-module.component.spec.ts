import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailModuleComponent } from './detail-module.component';

describe('DetailModuleComponent', () => {
  let component: DetailModuleComponent;
  let fixture: ComponentFixture<DetailModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
