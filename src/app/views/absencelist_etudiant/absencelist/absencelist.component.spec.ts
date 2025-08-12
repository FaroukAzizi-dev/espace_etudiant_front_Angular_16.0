import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencelistComponent } from './absencelist.component';

describe('AbsencelistComponent', () => {
  let component: AbsencelistComponent;
  let fixture: ComponentFixture<AbsencelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsencelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsencelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
