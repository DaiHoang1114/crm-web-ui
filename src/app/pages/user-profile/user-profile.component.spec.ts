import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserProfileComponent } from './user-profile.component';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    const mockProfile = {
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      emailVerified: true
    };

    authServiceMock = {
      getUserProfile: vi.fn().mockReturnValue(of(mockProfile)),
      getUserRoles: vi.fn().mockReturnValue(['user']),
      updateUserProfile: vi.fn().mockReturnValue(of(undefined)),
      logout: vi.fn().mockReturnValue(of(undefined))
    };

    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile on init', () => {
    expect(authServiceMock.getUserProfile).toHaveBeenCalled();
    expect(component.userProfile).toBeTruthy();
  });

  it('should initialize form with user data', () => {
    expect(component.profileForm.get('firstName')?.value).toBe('Test');
    expect(component.profileForm.get('lastName')?.value).toBe('User');
  });

  it('should validate required fields', () => {
    const firstNameControl = component.profileForm.get('firstName');
    firstNameControl?.setValue('');
    expect(firstNameControl?.hasError('required')).toBe(true);
  });

  it('should handle profile update', () => {
    component.updateUserProfile();
    expect(authServiceMock.updateUserProfile).toHaveBeenCalled();
  });

  it('should reset form to original values', () => {
    component.profileForm.patchValue({ firstName: 'Changed' });
    component.resetForm();
    expect(component.profileForm.get('firstName')?.value).toBe('Test');
  });
});
