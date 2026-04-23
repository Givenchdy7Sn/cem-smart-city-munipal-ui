import { Injectable } from '@angular/core';

export interface NavigationItem {
  label: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private navigationItems: NavigationItem[] = [
    { label: 'Cremation Bookings', route: '/cremation-bookings-dashboard' }
  ];

  getNavigationItems(): NavigationItem[] {
    return this.navigationItems;
  }
}
