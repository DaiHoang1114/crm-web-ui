import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Feature, QuickLink } from '../../core/interfaces/home.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  userName = 'Markarn Doe';

  features: Feature[] = [
    {
      icon: 'dashboard',
      title: 'Analytics Dashboard',
      description: 'Track your performance with real-time analytics and insights',
      color: 'blue'
    },
    {
      icon: 'team',
      title: 'Team Collaboration',
      description: 'Work together seamlessly with your team members',
      color: 'cyan'
    },
    {
      icon: 'security',
      title: 'Advanced Security',
      description: 'Keep your data safe with enterprise-grade security',
      color: 'purple'
    },
    {
      icon: 'automation',
      title: 'Automation Tools',
      description: 'Automate repetitive tasks and boost productivity',
      color: 'green'
    }
  ];

  quickLinks: QuickLink[] = [
    {
      title: 'Dashboard',
      description: 'View your analytics',
      route: '/dashboard',
      icon: 'chart',
      color: 'blue'
    },
    {
      title: 'Projects',
      description: 'Manage your projects',
      route: '/projects',
      icon: 'folder',
      color: 'cyan'
    },
    {
      title: 'Team',
      description: 'View team members',
      route: '/team',
      icon: 'users',
      color: 'purple'
    },
    {
      title: 'Settings',
      description: 'Configure your account',
      route: '/settings',
      icon: 'settings',
      color: 'green'
    }
  ];

  constructor(private router: Router) {}

  getCurrentTime(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }
}
