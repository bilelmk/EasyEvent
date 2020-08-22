import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVotesAddComponent } from './event-votes-add.component';

describe('EventVotesAddComponent', () => {
  let component: EventVotesAddComponent;
  let fixture: ComponentFixture<EventVotesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventVotesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventVotesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
