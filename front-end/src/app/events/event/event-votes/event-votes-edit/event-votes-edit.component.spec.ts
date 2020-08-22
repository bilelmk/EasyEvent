import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVotesEditComponent } from './event-votes-edit.component';

describe('EventVotesEditComponent', () => {
  let component: EventVotesEditComponent;
  let fixture: ComponentFixture<EventVotesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventVotesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventVotesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
