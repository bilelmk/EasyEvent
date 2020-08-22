import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventPlanComponent } from './create-event-plan.component';

describe('CreateEventPlanComponent', () => {
  let component: CreateEventPlanComponent;
  let fixture: ComponentFixture<CreateEventPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
