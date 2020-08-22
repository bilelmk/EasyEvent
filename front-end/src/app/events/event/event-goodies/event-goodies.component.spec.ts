import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGoodiesComponent } from './event-goodies.component';

describe('EventGoodiesComponent', () => {
  let component: EventGoodiesComponent;
  let fixture: ComponentFixture<EventGoodiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGoodiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGoodiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
