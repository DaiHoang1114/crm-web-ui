import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class Navbar implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  private authService = inject(AuthService);
  username: string = '';
  isAuthenticated: boolean = false;

  ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn();
    if (this.isAuthenticated) {
      this.username = this.authService.getUsername();
    }
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  login(): void {
    this.authService.login().subscribe({
      next: () => {
        this.isAuthenticated = true;
        this.username = this.authService.getUsername();
      },
      error: (err) => {
        console.error('Login error:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isAuthenticated = false;
        this.username = '';
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }
}
