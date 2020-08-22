import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesGeneratorComponent } from './badges-generator.component';

describe('BadgesGeneratorComponent', () => {
  let component: BadgesGeneratorComponent;
  let fixture: ComponentFixture<BadgesGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgesGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
