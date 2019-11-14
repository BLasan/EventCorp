import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerLayoutComponent } from './organizer-layout.component';
import { OrganizerHomeComponent } from 'app/Modules/Organizer-Module/organizer-home/organizer-home.component';
import { OrganizerSettingsComponent } from 'app/Modules/Organizer-Module/organizer-settings/organizer-settings.component';
import { OrganizerNotificationsComponent } from 'app/Modules/Organizer-Module/organizer-notifications/organizer-notifications.component';
import { OrganizerProfileComponent } from 'app/Modules/Organizer-Module/organizer-profile/organizer-profile.component';
import { OrganizerEventsComponent } from 'app/Modules/Organizer-Module/organizer-events/organizer-events.component';
import { FilterUsersPipe } from 'app/services/filter_users.pipe';
import { OrganizerLayoutModule } from './organizer-layout.module';
import { DragAndDropModule } from 'angular-draggable-droppable';

describe('OrganizerLayoutComponent', () => {
  let component: OrganizerLayoutComponent;
  let fixture: ComponentFixture<OrganizerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports:[OrganizerLayoutModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
