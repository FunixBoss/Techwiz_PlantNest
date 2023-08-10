import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedNewComponent } from './related-new.component';

describe('RelatedNewComponent', () => {
  let component: RelatedNewComponent;
  let fixture: ComponentFixture<RelatedNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
