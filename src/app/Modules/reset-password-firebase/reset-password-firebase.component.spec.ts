import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordFirebaseComponent } from './reset-password-firebase.component';

describe('ResetPasswordFirebaseComponent', () => {
  let component: ResetPasswordFirebaseComponent;
  let fixture: ComponentFixture<ResetPasswordFirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordFirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
