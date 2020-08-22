import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitationCalendarPage } from './invitation-calendar.page';

describe('InvitationCalendarPage', () => {
  let component: InvitationCalendarPage;
  let fixture: ComponentFixture<InvitationCalendarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationCalendarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
