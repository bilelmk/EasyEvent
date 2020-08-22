import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGoodiesResultComponent } from './event-goodies-result.component';

describe('EventGoodiesResultComponent', () => {
  let component: EventGoodiesResultComponent;
  let fixture: ComponentFixture<EventGoodiesResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGoodiesResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGoodiesResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
