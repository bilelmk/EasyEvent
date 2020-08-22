import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetpicturePage } from './setpicture.page';

describe('SetpicturePage', () => {
  let component: SetpicturePage;
  let fixture: ComponentFixture<SetpicturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetpicturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetpicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
