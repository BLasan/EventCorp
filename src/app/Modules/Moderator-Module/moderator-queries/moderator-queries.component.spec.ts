import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorQueriesComponent } from './moderator-queries.component';

describe('ModeratorQueriesComponent', () => {
  let component: ModeratorQueriesComponent;
  let fixture: ComponentFixture<ModeratorQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
