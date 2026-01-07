import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunzoneComponent } from './funzone.component';

describe('FunzoneComponent', () => {
  let component: FunzoneComponent;
  let fixture: ComponentFixture<FunzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunzoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
