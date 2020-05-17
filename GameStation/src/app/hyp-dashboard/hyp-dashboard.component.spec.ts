import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypDashboardComponent } from './hyp-dashboard.component';

describe('HypDashboardComponent', () => {
  let component: HypDashboardComponent;
  let fixture: ComponentFixture<HypDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
