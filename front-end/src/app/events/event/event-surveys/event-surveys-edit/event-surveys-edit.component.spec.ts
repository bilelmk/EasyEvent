import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSurveysEditComponent } from './event-surveys-edit.component';

describe('EventSurveysEditComponent', () => {
  let component: EventSurveysEditComponent;
  let fixture: ComponentFixture<EventSurveysEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSurveysEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSurveysEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
