import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVotesComponent } from './event-votes.component';

describe('EventVotesComponent', () => {
  let component: EventVotesComponent;
  let fixture: ComponentFixture<EventVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
