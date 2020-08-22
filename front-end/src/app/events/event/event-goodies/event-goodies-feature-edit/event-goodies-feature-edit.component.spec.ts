import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGoodiesFeatureEditComponent } from './event-goodies-feature-edit.component';

describe('EventGoodiesFeatureEditComponent', () => {
  let component: EventGoodiesFeatureEditComponent;
  let fixture: ComponentFixture<EventGoodiesFeatureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGoodiesFeatureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGoodiesFeatureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
