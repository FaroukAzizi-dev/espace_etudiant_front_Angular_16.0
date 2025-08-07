import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipofferlistComponent } from './internshipofferlist.component';

describe('InternshipofferlistComponent', () => {
  let component: InternshipofferlistComponent;
  let fixture: ComponentFixture<InternshipofferlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipofferlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternshipofferlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
