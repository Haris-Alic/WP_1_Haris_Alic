import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelTrackerComponent } from './pixel-tracker.component';

describe('PixelTrackerComponent', () => {
  let component: PixelTrackerComponent;
  let fixture: ComponentFixture<PixelTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixelTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixelTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
