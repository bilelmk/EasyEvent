import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitationHomePage } from './invitation-home.page';

describe('InvitationHomePage', () => {
  let component: InvitationHomePage;
  let fixture: ComponentFixture<InvitationHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
