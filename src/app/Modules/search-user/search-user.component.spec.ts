import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
<<<<<<< HEAD:src/app/Modules/search-user/search-user.component.spec.ts
=======
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
import { SearchUserComponent } from './search-user.component';

describe('SearchUserComponent', () => {
  let component: SearchUserComponent;
  let fixture: ComponentFixture<SearchUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUserComponent ]
<<<<<<< HEAD
=======
import { ArtistRequestComponent } from './artist-request.component';

describe('ArtistRequestComponent', () => {
  let component: ArtistRequestComponent;
  let fixture: ComponentFixture<ArtistRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistRequestComponent ]
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/Modules/Artist-Module/artist-request/artist-request.component.spec.ts
=======
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD
<<<<<<< HEAD:src/app/Modules/search-user/search-user.component.spec.ts
    fixture = TestBed.createComponent(SearchUserComponent);
=======
    fixture = TestBed.createComponent(ArtistRequestComponent);
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/Modules/Artist-Module/artist-request/artist-request.component.spec.ts
=======
    fixture = TestBed.createComponent(SearchUserComponent);
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
