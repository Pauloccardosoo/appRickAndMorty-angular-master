import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
// SearchService is not needed anymore
import { Router, ActivatedRoute } from '@angular/router';
// filter, map, NavigationEnd are not needed anymore

interface MenuItems {
  name: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public menuItems: MenuItems[] = [
    { name: 'Personagens', path: '/characters' },
    { name: 'Episódios', path: '/episodes' },
    { name: 'Localizaçao', path: '/locations' },
  ];

  isAuthenticated: boolean = false;
  username: string | null = null;
  private authSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    public router: Router, // Make router public
    private activatedRoute: ActivatedRoute // Keep ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (status) => (this.isAuthenticated = status)
    );
    this.userSubscription = this.authService.currentUser$.subscribe(
      (user) => (this.username = user)
    );
    // Remove router event subscription
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  onSearch(value: string) {
    
  }

  search( searchTerm: string ) {
    const queryParams = searchTerm.trim().length > 0 ? { search: searchTerm } : { search: null };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // Merge with existing query params
    });
  }
}
