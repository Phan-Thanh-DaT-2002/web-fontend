import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTenScriptComponent } from './top-ten-script.component';

describe('TopTenScriptComponent', () => {
  let component: TopTenScriptComponent;
  let fixture: ComponentFixture<TopTenScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopTenScriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTenScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
