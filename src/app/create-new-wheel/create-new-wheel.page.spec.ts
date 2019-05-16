import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewWheelPage } from './create-new-wheel.page';

describe('CreateNewWheelPage', () => {
  let component: CreateNewWheelPage;
  let fixture: ComponentFixture<CreateNewWheelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewWheelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewWheelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
