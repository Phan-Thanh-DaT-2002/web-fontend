import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultesUserComponent } from './test-resultes-user.component';

describe('TestResultesUserComponent', () => {
  let component: TestResultesUserComponent;
  let fixture: ComponentFixture<TestResultesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestResultesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
