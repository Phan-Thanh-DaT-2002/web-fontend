import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveLiveSessionComponent } from './top-five-live-session.component';

describe('TopFiveLiveSessionComponent', () => {
  let component: TopFiveLiveSessionComponent;
  let fixture: ComponentFixture<TopFiveLiveSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopFiveLiveSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFiveLiveSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
