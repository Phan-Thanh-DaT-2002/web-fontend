import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoseForTestComponent } from './chose-for-test.component';

describe('ChoseForTestComponent', () => {
  let component: ChoseForTestComponent;
  let fixture: ComponentFixture<ChoseForTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoseForTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoseForTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
