import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsdQueryComponent } from './csd-query.component';

describe('CsdQueryComponent', () => {
  let component: CsdQueryComponent;
  let fixture: ComponentFixture<CsdQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsdQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsdQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
