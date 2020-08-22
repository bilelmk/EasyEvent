import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGoodiesFeatureDeleteComponent } from './event-goodies-feature-delete.component';

describe('EventGoodiesFeatureDeleteComponent', () => {
  let component: EventGoodiesFeatureDeleteComponent;
  let fixture: ComponentFixture<EventGoodiesFeatureDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGoodiesFeatureDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGoodiesFeatureDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
