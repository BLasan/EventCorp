import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewModeratorsComponent } from './add-new-moderators.component';

describe('AddNewModeratorsComponent', () => {
  let component: AddNewModeratorsComponent;
  let fixture: ComponentFixture<AddNewModeratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewModeratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewModeratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
