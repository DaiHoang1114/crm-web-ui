import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayout } from './main-layout.component';
import { provideRouter } from '@angular/router';

describe('MainLayout', () => {
  let component: MainLayout;
  let fixture: ComponentFixture<MainLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    const initialState = component.isSidebarCollapsed;
    component.onToggleSidebar();
    expect(component.isSidebarCollapsed).toBe(!initialState);
  });
});
