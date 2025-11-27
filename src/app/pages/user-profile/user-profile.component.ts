import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile, UserProfileControl } from './../../core/interfaces/user-profile.interface';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private authService = inject(AuthService);

  userProfile: UserProfile | null = null;
  profileForm!: FormGroup<UserProfileControl>;
  loading = true;
  saving = false;
  error = '';
  successMessage = '';
  roles: string[] = [];

  ngOnInit() {
    this.initializeForm();
    this.loadUserProfile();
  }

  initializeForm() {
    this.profileForm = new FormGroup<UserProfileControl>({
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
        nonNullable: true
    }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
        nonNullable: true
    }),
      email: new FormControl({value: '', disabled: true}, {
        validators: [Validators.required, Validators.email],
        nonNullable: true
    }),
      username: new FormControl({value: '', disabled: true}, {
        validators: [Validators.required, Validators.minLength(2)],
        nonNullable: true
    })
    });
  }

  loadUserProfile() {
    this.loading = true;
    this.error = '';

    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = {
          username: profile.username || '',
          email: profile.email || '',
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          emailVerified: profile.emailVerified || false
        };

        this.profileForm.patchValue({
          firstName: this.userProfile.firstName,
          lastName: this.userProfile.lastName,
          email: this.userProfile.email,
          username: this.userProfile.username
        });

        this.roles = this.authService.getUserRoles();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.error = 'Failed to load user profile';
        this.loading = false;
      }
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    this.saving = true;
    this.error = '';
    this.successMessage = '';

    // In a real app, you would update the profile via API
    setTimeout(() => {
      this.successMessage = 'Profile updated successfully!';
      this.saving = false;

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, 1000);
  }

  resetForm() {
    if (this.userProfile) {
      this.profileForm.patchValue({
        firstName: this.userProfile.firstName,
        lastName: this.userProfile.lastName
      });
    }
    this.error = '';
    this.successMessage = '';
  }

  logout() {
    this.authService.logout().subscribe();
  }

  getInitials(): string {
    if (!this.userProfile) return '??';
    const first = this.userProfile.firstName?.[0] || '';
    const last = this.userProfile.lastName?.[0] || '';
    return (first + last).toUpperCase() || this.userProfile.username?.[0]?.toUpperCase() || '?';
  }

  getFullName(): string {
    if (!this.userProfile) return 'User';
    return `${this.userProfile.firstName} ${this.userProfile.lastName}`.trim() || this.userProfile.username;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('minlength')) {
      return `Minimum length is ${field.errors?.['minlength'].requiredLength}`;
    }
    return '';
  }

  updateUserProfile() {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    this.saving = true;
    this.error = '';
    this.successMessage = '';

    const { firstName, lastName } = this.profileForm.getRawValue();

    this.authService.updateUserProfile(firstName, lastName).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully!';
        this.saving = false;

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.error = 'Failed to update user profile';
        this.saving = false;
      }
    });
  }
}
