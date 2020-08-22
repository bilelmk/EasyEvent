import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGoodiesAddComponent } from './event-goodies-add.component';

describe('EventGoodiesAddComponent', () => {
  let component: EventGoodiesAddComponent;
  let fixture: ComponentFixture<EventGoodiesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGoodiesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGoodiesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
