import { Routes } from '@angular/router';
import { CremationBookingsDashboard } from './features/cremation-bookings-dashboard/cremation-bookings-dashboard';
import { ViewCremationBooking } from './features/view-cremation-booking/view-cremation-booking';

export const routes: Routes = [
  { path: 'cremation-bookings-dashboard', component: CremationBookingsDashboard },
  { path: 'cremation-booking/:id', component: ViewCremationBooking },

  { path: '', redirectTo: 'cremation-bookings-dashboard', pathMatch: 'full' }
];
