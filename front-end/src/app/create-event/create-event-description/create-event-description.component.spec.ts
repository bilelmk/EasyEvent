import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventDescriptionComponent } from './create-event-description.component';

describe('CreateEventDescriptionComponent', () => {
  let component: CreateEventDescriptionComponent;
  let fixture: ComponentFixture<CreateEventDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
