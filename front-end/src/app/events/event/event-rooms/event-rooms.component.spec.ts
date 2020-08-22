import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRoomsComponent } from './event-rooms.component';

describe('EventRoomsComponent', () => {
  let component: EventRoomsComponent;
  let fixture: ComponentFixture<EventRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
