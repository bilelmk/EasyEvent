import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGoodiesEditComponent } from './event-goodies-edit.component';

describe('EventGoodiesEditComponent', () => {
  let component: EventGoodiesEditComponent;
  let fixture: ComponentFixture<EventGoodiesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGoodiesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGoodiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
