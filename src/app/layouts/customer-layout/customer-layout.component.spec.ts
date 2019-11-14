import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLayoutComponent } from './customer-layout.component';
import { CustomerHomeComponent } from 'app/Modules/Customer-Module/customer-home/customer-home.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatCardModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from 'app/shared-components/shared-components.module';
import { SearchFilterPipe } from 'app/components/navbar/search-filter.pipe';
import { RouterModule } from '@angular/router';
import { CustomerLayoutRoutes } from './customer-layout.routing';
import { CustomerLayoutModule } from './customer-layout.module';
import { CustomerNavbarComponent } from 'app/customer-components/customer-navbar/customer-navbar.component';
import { CustomerNavbarModule } from 'app/customer-components/customer-navbar/customer-navbar.module';
import { ComponentsModule } from 'app/components/components.module';
// import {APP_BASE_HREF} from '@angular/common';
import { AppRoutingModule } from 'app/app.routing';
import {RouterTestingModule} from '@angular/router/testing'
import { AppComponent } from 'app/app.component';
import { HomePageComponentModule } from 'app/Modules/home-page/home-page.module';
describe('CustomerLayoutComponent', () => {
  let component: CustomerLayoutComponent;
  let fixture: ComponentFixture<CustomerLayoutComponent>;
  let component1:CustomerHomeComponent;
  let fixture1:ComponentFixture<CustomerHomeComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes(CustomerLayoutRoutes),
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        CustomerNavbarModule,
        ComponentsModule,
        HomePageComponentModule,
       // RouterTestingModule
        // AppRoutingModule,
        CustomerLayoutModule
      ],
      declarations: [CustomerLayoutComponent],
      providers:[SearchFilterPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // beforeEach(() => {
  //   fixture1= TestBed.createComponent(CustomerHomeComponent);
  //   component1= fixture1.componentInstance;
  //   fixture1.detectChanges();
  // });

  


  it('should create', () => {
    // fixture = TestBed.createComponent(CustomerLayoutComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    expect(component).toBeTruthy();
    // expect(component1).toBeTruthy();
  });

  // it('should create', () => {
  //   let fixture1 = TestBed.createComponent(CustomerHomeComponent);
  //   let component1 = fixture1.componentInstance;
  //   fixture1.detectChanges();
  //   expect(component1).toBeTruthy();
    
  // });


});
