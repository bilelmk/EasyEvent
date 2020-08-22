import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGoodiesOptionAddComponent } from './event-goodies-option-add.component';

describe('EventGoodiesOptionAddComponent', () => {
  let component: EventGoodiesOptionAddComponent;
  let fixture: ComponentFixture<EventGoodiesOptionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGoodiesOptionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGoodiesOptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
