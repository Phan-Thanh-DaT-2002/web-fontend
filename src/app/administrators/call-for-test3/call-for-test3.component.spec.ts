import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallForTest3Component } from './call-for-test3.component';

describe('CallForTest3Component', () => {
  let component: CallForTest3Component;
  let fixture: ComponentFixture<CallForTest3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallForTest3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallForTest3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
