import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventSidebarComponent } from './create-event-sidebar.component';

describe('CreateEventSidebarComponent', () => {
  let component: CreateEventSidebarComponent;
  let fixture: ComponentFixture<CreateEventSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
