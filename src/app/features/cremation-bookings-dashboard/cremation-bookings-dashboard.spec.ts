import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CremationBookingsDashboard } from './cremation-bookings-dashboard';

describe('CremationBookingsDashboard', () => {
  let component: CremationBookingsDashboard;
  let fixture: ComponentFixture<CremationBookingsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CremationBookingsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CremationBookingsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
