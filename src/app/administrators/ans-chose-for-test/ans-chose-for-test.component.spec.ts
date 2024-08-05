import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsChoseForTestComponent } from './ans-chose-for-test.component';

describe('AnsChoseForTestComponent', () => {
  let component: AnsChoseForTestComponent;
  let fixture: ComponentFixture<AnsChoseForTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsChoseForTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsChoseForTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
