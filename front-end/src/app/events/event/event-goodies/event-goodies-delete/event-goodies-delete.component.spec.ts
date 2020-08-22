import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGoodiesDeleteComponent } from './event-goodies-delete.component';

describe('EventGoodiesDeleteComponent', () => {
  let component: EventGoodiesDeleteComponent;
  let fixture: ComponentFixture<EventGoodiesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGoodiesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGoodiesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
