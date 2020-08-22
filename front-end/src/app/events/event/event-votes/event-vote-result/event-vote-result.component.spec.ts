import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVoteResultComponent } from './event-vote-result.component';

describe('EventVoteResultComponent', () => {
  let component: EventVoteResultComponent;
  let fixture: ComponentFixture<EventVoteResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventVoteResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventVoteResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
