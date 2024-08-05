import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallForTest2Component } from './call-for-test2.component';

describe('CallForTest2Component', () => {
  let component: CallForTest2Component;
  let fixture: ComponentFixture<CallForTest2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallForTest2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallForTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
