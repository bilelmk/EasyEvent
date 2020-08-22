import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitationMapPage } from './invitation-map.page';

describe('InvitationMapPage', () => {
  let component: InvitationMapPage;
  let fixture: ComponentFixture<InvitationMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
