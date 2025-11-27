import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed = false;
  isMobileMenuOpen = false;

  private authService = inject(AuthService);

  user: {
    name: string;
    email: string;
    avatar: string;
  } = {
    name: '',
    email: '',
    avatar: ''
  };

  menuSections = [
    {
      title: 'HOME',
      items: [
        { label: 'General', icon: 'dashboard', route: '/home' },
        { label: 'Classic', icon: 'classic', route: '/dashboard' },
        { label: 'Profile', icon: 'analytics', route: '/user-profile' },
        // { label: 'Campaign', icon: 'campaign', route: '/campaign' },
        { label: 'Modern', icon: 'modern', route: '/modern', roles: ['admin'] }
      ]
    }
  ];

  ngOnInit() {
    // Set default username first
    const username = this.authService.getUsername();
    this.user.name = username || 'User';
    this.user.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    // Try to load full profile
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        const firstName = profile.firstName || '';
        const lastName = profile.lastName || '';
        const fullName = `${firstName} ${lastName}`.trim();

        this.user = {
          name: fullName || profile.username || username || 'User',
          email: profile.email || '',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username || username}`
        };
      },
      error: (error) => {
        console.error('Error loading user profile', error);
        // Already have default values set above
      }
    });
  }

  hasRole(roles?: string[]): boolean {
    if (!roles || roles.length === 0) return true;
    return this.authService.hasAnyRole(roles);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
