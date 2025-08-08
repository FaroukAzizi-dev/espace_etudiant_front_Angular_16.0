import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAbsencesComponent } from './teacher-absences.component';

describe('TeacherAbsencesComponent', () => {
  let component: TeacherAbsencesComponent;
  let fixture: ComponentFixture<TeacherAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAbsencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
