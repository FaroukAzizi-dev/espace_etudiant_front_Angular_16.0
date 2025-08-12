import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiListComponent } from './emploilist.component';

describe('EmploilistComponent', () => {
  let component: EmploiListComponent;
  let fixture: ComponentFixture<EmploiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploiListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
