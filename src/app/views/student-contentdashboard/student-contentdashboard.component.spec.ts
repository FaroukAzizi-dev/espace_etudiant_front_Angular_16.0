import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentContentdashboardComponent } from './student-contentdashboard.component';

describe('StudentContentdashboardComponent', () => {
  let component: StudentContentdashboardComponent;
  let fixture: ComponentFixture<StudentContentdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentContentdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentContentdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
