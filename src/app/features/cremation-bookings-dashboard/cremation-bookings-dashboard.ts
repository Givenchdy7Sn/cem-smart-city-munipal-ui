import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CremationService } from '../../services/cremation-booking.service';
import { CremationBooking } from '../../models/cremation-booking.model';
import { EnumToLabelPipe } from '../../core/pipes/enum-to-label.pipe';

@Component({
  selector: 'app-bookings-dashboard',
  imports: [CommonModule, EnumToLabelPipe],
  templateUrl: './cremation-bookings-dashboard.html',
  styleUrl: './cremation-bookings-dashboard.scss',
})
export class CremationBookingsDashboard implements OnInit {
  bookings: CremationBooking[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private cremationService: CremationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.error = null;

    this.cremationService.getAllCremationBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load cremation bookings', err);
        this.error = 'Unable to load bookings from the backend.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  viewBooking(booking: CremationBooking): void {
    const bookingId = booking.id ?? (booking as any).Id ?? (booking as any).bookingId;
    if (!bookingId) {
      console.warn('Cannot navigate: booking ID is missing', booking);
      return;
    }

    this.router.navigate(['/cremation-booking', bookingId]);
  }

  createNewBooking(): void {
    this.router.navigate(['/create-cremation-booking']);
  }
}
