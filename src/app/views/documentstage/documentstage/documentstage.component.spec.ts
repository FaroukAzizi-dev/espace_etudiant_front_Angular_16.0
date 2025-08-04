import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentstageComponent } from './documentstage.component';

describe('DocumentstageComponent', () => {
  let component: DocumentstageComponent;
  let fixture: ComponentFixture<DocumentstageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentstageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
