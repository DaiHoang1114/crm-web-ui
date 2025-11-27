import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

interface Activity {
  user: string;
  action: string;
  time: string;
  avatar: string;
}

interface SalesData {
  product: string;
  amount: number;
  change: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: StatCard[] = [
    { title: 'Total Revenue', value: '$58,356', change: 12.5, icon: 'trending_up', color: 'blue' },
    { title: 'New Customers', value: '1,234', change: 8.3, icon: 'people', color: 'cyan' },
    { title: 'Active Projects', value: '48', change: -3.2, icon: 'work', color: 'purple' },
    { title: 'Completion Rate', value: '94%', change: 5.1, icon: 'check_circle', color: 'green' }
  ];

  recentActivities: Activity[] = [
    { user: 'John Smith', action: 'Created new project "Mobile App Redesign"', time: '2 min ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    { user: 'Maria Garcia', action: 'Completed task "Update Documentation"', time: '15 min ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
    { user: 'James Wilson', action: 'Uploaded 5 new files to project', time: '1 hour ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
    { user: 'Sarah Johnson', action: 'Added comment to "Design System"', time: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
  ];

  salesData: SalesData[] = [
    { product: 'Product A', amount: 20450, change: 12 },
    { product: 'Product B', amount: 18320, change: 8 },
    { product: 'Product C', amount: 15890, change: -5 },
    { product: 'Product D', amount: 12340, change: 15 }
  ];

  constructor() { }

  ngOnInit() {
  }

  getChangeClass(change: number): string {
    return change >= 0 ? 'positive' : 'negative';
  }

  getChangeIcon(change: number): string {
    return change >= 0 ? '↑' : '↓';
  }
}
