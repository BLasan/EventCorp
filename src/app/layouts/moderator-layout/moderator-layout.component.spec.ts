import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorLayoutComponent } from './moderator-layout.component';

describe('ModeratorLayoutComponent', () => {
  let component: ModeratorLayoutComponent;
  let fixture: ComponentFixture<ModeratorLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
