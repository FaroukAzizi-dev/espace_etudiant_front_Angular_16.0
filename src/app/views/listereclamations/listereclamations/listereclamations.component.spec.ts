import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReclamationsComponent } from './listereclamations.component';

describe('ListereclamationsComponent', () => {
  let component: ListeReclamationsComponent;
  let fixture: ComponentFixture<ListeReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeReclamationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
