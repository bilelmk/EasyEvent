import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatisticsPage } from './statistique.page';

describe('StatistiquePage', () => {
  let component: StatisticsPage;
  let fixture: ComponentFixture<StatisticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
