import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVotesDeleteComponent } from './event-votes-delete.component';

describe('EventVotesDeleteComponent', () => {
  let component: EventVotesDeleteComponent;
  let fixture: ComponentFixture<EventVotesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventVotesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventVotesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
