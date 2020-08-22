import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAddFromcsvComponent } from './users-add-fromcsv.component';

describe('UsersAddFromcsvComponent', () => {
  let component: UsersAddFromcsvComponent;
  let fixture: ComponentFixture<UsersAddFromcsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAddFromcsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAddFromcsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
