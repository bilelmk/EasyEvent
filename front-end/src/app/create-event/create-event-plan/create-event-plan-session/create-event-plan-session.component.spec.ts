import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventPlanSessionComponent } from './create-event-plan-session.component';

describe('CreateEventPlanSessionComponent', () => {
  let component: CreateEventPlanSessionComponent;
  let fixture: ComponentFixture<CreateEventPlanSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventPlanSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventPlanSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
