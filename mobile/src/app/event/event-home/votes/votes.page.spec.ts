import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VotesPage } from './polls.page';

describe('PollsPage', () => {
  let component: VotesPage;
  let fixture: ComponentFixture<VotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
