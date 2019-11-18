import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { ArtistRequestComponent } from './artist-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatCardModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatIconModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
=======
<<<<<<< HEAD:src/app/Modules/search-user/search-user.component.spec.ts
import { SearchUserComponent } from './search-user.component';

describe('SearchUserComponent', () => {
  let component: SearchUserComponent;
  let fixture: ComponentFixture<SearchUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUserComponent ]
=======
import { ArtistRequestComponent } from './artist-request.component';
>>>>>>> af05326492d9b3a8f847cbc07022301514769862

describe('ArtistRequestComponent', () => {
  let component: ArtistRequestComponent;
  let fixture: ComponentFixture<ArtistRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
      imports:[
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatCardModule,
        MatListModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatIconModule,
        NgbModule,
        SharedComponentsModule,
      ],
      declarations: [ ArtistRequestComponent ]
=======
      declarations: [ ArtistRequestComponent ]
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/Modules/Artist-Module/artist-request/artist-request.component.spec.ts
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(ArtistRequestComponent);
=======
<<<<<<< HEAD:src/app/Modules/search-user/search-user.component.spec.ts
    fixture = TestBed.createComponent(SearchUserComponent);
=======
    fixture = TestBed.createComponent(ArtistRequestComponent);
>>>>>>> af05326492d9b3a8f847cbc07022301514769862:src/app/Modules/Artist-Module/artist-request/artist-request.component.spec.ts
>>>>>>> af05326492d9b3a8f847cbc07022301514769862
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
