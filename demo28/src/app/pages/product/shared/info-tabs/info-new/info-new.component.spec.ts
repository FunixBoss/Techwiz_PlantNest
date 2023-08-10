import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoNewComponent } from './info-new.component';

describe('InfoNewComponent', () => {
  let component: InfoNewComponent;
  let fixture: ComponentFixture<InfoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
