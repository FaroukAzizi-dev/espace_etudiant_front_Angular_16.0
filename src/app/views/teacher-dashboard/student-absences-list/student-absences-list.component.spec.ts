import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAbsencesListComponent } from './student-absences-list.component';

describe('StudentAbsencesListComponent', () => {
  let component: StudentAbsencesListComponent;
  let fixture: ComponentFixture<StudentAbsencesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAbsencesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAbsencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
