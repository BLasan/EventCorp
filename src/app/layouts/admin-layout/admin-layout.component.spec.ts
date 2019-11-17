import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from 'app/Modules/Admin-Module/dashboard/dashboard.component';
import { UserProfileComponent } from 'app/Modules/Admin-Module/user-profile/user-profile.component';
import { TableListComponent } from 'app/Modules/Admin-Module/table-list/table-list.component';
import { TypographyComponent } from 'app/Modules/Admin-Module/typography/typography.component';
import { IconsComponent } from 'app/Modules/Admin-Module/icons/icons.component';
import { MapsComponent } from 'app/Modules/Admin-Module/maps/maps.component';
import { AdminNotificationsComponent } from 'app/Modules/Admin-Module/admin-notifications/admin-notifications.component';
import { UpgradeComponent } from 'app/Modules/Admin-Module/upgrade/upgrade.component';
import { AddNewModeratorsComponent } from 'app/Modules/Admin-Module/add-new-moderators/add-new-moderators.component';
import { AdminLayoutModule } from './admin-layout.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatListModule, MatDividerModule } from '@angular/material';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { AuthGuardAdminService } from 'app/services/Authentication/authGuard_admin.service';
import { SearchFilterPipe } from 'app/components/navbar/search-filter.pipe';
import { AdminLayoutRoutes } from './admin-layout.routing';

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          FormsModule,
          MatButtonModule,
          MatRippleModule,
          MatFormFieldModule,
          MatInputModule,
          MatSelectModule,
          MatTooltipModule,
          ReactiveFormsModule,
          MatListModule,
          MatDividerModule,
          CommonModule,
          ComponentsModule,
          RouterModule
        ],
      declarations: [AdminLayoutComponent,AppComponent],
      providers:[SearchFilterPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
