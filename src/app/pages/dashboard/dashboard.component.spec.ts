import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have stats data', () => {
    expect(component.stats.length).toBeGreaterThan(0);
  });

  it('should have recent activities', () => {
    expect(component.recentActivities.length).toBeGreaterThan(0);
  });

  it('should have sales data', () => {
    expect(component.salesData.length).toBeGreaterThan(0);
  });

  it('should return correct change class', () => {
    expect(component.getChangeClass(5)).toBe('positive');
    expect(component.getChangeClass(-5)).toBe('negative');
  });

  it('should return correct change icon', () => {
    expect(component.getChangeIcon(5)).toBe('↑');
    expect(component.getChangeIcon(-5)).toBe('↓');
  });
});
