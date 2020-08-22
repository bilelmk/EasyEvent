import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVotesAddOptionComponent } from './event-votes-add-option.component';

describe('EventVotesAddOptionComponent', () => {
  let component: EventVotesAddOptionComponent;
  let fixture: ComponentFixture<EventVotesAddOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventVotesAddOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventVotesAddOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
