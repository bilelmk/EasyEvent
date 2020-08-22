import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGoodiesFeatureAddComponent } from './event-goodies-feature-add.component';

describe('EventGoodiesFeatureAddComponent', () => {
  let component: EventGoodiesFeatureAddComponent;
  let fixture: ComponentFixture<EventGoodiesFeatureAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGoodiesFeatureAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGoodiesFeatureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
