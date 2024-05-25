import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFourBotComponent } from './top-four-bot.component';

describe('TopFourBotComponent', () => {
  let component: TopFourBotComponent;
  let fixture: ComponentFixture<TopFourBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopFourBotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFourBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
