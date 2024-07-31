import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Answer3Component } from './answer3.component';

describe('Answer3Component', () => {
  let component: Answer3Component;
  let fixture: ComponentFixture<Answer3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Answer3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Answer3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
