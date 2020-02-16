import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProvidersComponent } from './show-providers.component';

describe('ShowProvidersComponent', () => {
  let component: ShowProvidersComponent;
  let fixture: ComponentFixture<ShowProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
