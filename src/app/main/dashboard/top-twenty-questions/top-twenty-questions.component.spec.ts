import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTwentyQuestionsComponent } from './top-twenty-questions.component';

describe('TopTwentyQuestionsComponent', () => {
  let component: TopTwentyQuestionsComponent;
  let fixture: ComponentFixture<TopTwentyQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopTwentyQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTwentyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
