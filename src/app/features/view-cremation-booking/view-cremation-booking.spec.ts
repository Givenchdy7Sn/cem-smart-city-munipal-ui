import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCremationBooking } from './view-cremation-booking';

describe('ViewCremationBooking', () => {
  let component: ViewCremationBooking;
  let fixture: ComponentFixture<ViewCremationBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCremationBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCremationBooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
