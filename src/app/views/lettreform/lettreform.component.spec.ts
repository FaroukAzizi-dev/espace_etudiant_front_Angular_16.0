import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LettreformComponent } from './lettreform.component';

describe('LettreformComponent', () => {
  let component: LettreformComponent;
  let fixture: ComponentFixture<LettreformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LettreformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LettreformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
