import { Routes } from '@angular/router';
import { CremationBookingsDashboard } from './features/cremation-bookings-dashboard/cremation-bookings-dashboard';
import { ViewCremationBooking } from './features/view-cremation-booking/view-cremation-booking';
import { LoginComponent } from './public-features/login/login';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cremation-bookings-dashboard', component: CremationBookingsDashboard },
  { path: 'cremation-booking/:id', component: ViewCremationBooking },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
