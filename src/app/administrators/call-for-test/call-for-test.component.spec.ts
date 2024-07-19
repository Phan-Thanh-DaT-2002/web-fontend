import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallForTestComponent } from './call-for-test.component';

describe('CallForTestComponent', () => {
  let component: CallForTestComponent;
  let fixture: ComponentFixture<CallForTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallForTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallForTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
