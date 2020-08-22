import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitationSubsessionPage } from './invitation-subsession.page';

describe('InvitationSubsessionPage', () => {
  let component: InvitationSubsessionPage;
  let fixture: ComponentFixture<InvitationSubsessionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationSubsessionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationSubsessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
