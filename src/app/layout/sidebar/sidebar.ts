import { Component } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { SidebarService, NavigationItem } from './sidebar.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  navigationItems: NavigationItem[];
  activeNavItem: string = '';

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) {
    this.navigationItems = this.sidebarService.getNavigationItems();

    // Set initial active item
    this.activeNavItem = this.router.url;

    // Update active item on route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeNavItem = event.url;
      });
  }

  isActive(route: string): boolean {
    return this.activeNavItem === route;
  }
}
