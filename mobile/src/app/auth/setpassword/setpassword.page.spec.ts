import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetpasswordPage } from './setpassword.page';

describe('SetpasswordPage', () => {
  let component: SetpasswordPage;
  let fixture: ComponentFixture<SetpasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetpasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
