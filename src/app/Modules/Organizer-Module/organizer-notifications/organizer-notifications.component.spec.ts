import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerNotificationsComponent } from './organizer-notifications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatCardModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatSliderModule, MatAutocompleteModule, MatButtonToggleModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatStepperModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';

describe('OrganizerNotificationsComponent', () => {
  let component: OrganizerNotificationsComponent;
  let fixture: ComponentFixture<OrganizerNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        MatSliderModule,
        NgbModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatStepperModule,
        MatListModule,
        NgxMatSelectSearchModule,
        SharedComponentsModule,
      ],
      declarations: [ OrganizerNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
