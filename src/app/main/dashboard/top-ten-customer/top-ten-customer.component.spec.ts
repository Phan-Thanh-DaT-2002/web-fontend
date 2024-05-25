import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTenCustomerComponent } from './top-ten-customer.component';

describe('TopTenCustomerComponent', () => {
  let component: TopTenCustomerComponent;
  let fixture: ComponentFixture<TopTenCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopTenCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTenCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
