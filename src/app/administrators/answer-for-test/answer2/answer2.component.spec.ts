import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Answer2Component } from './answer2.component';

describe('Answer2Component', () => {
  let component: Answer2Component;
  let fixture: ComponentFixture<Answer2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Answer2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Answer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
