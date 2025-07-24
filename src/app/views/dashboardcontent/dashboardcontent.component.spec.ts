import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContentComponent } from './dashboardcontent.component';

describe('DashboardcontentComponent', () => {
  let component: DashboardContentComponent ;
  let fixture: ComponentFixture<DashboardContentComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardContentComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
