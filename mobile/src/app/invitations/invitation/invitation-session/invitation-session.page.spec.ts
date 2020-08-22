import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitationSessionPage } from './invitation-session.page';

describe('InvitationSessionPage', () => {
  let component: InvitationSessionPage;
  let fixture: ComponentFixture<InvitationSessionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationSessionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
