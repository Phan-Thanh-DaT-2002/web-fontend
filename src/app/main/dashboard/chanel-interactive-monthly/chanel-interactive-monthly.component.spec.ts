import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanelInteractiveMonthlyComponent } from './chanel-interactive-monthly.component';

describe('ChanelInteractiveMonthlyComponent', () => {
  let component: ChanelInteractiveMonthlyComponent;
  let fixture: ComponentFixture<ChanelInteractiveMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChanelInteractiveMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanelInteractiveMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
