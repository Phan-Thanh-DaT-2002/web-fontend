import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultesComponent } from './resultes.component';

describe('ResultesComponent', () => {
  let component: ResultesComponent;
  let fixture: ComponentFixture<ResultesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
