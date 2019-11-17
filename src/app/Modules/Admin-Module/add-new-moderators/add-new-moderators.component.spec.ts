import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewModeratorsComponent } from './add-new-moderators.component';
import { MatFormFieldModule } from '@angular/material';

describe('AddNewModeratorsComponent', () => {
  let component: AddNewModeratorsComponent;
  let fixture: ComponentFixture<AddNewModeratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatFormFieldModule
      ],
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
