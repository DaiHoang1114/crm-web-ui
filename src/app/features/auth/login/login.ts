import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFormControls, LoginFormValue } from '../../../core/interfaces/login-form.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm!: FormGroup<LoginFormControls>;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup<LoginFormControls>({
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true
      }),
      rememberDevice: new FormControl(false)
    });
  }

  login() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.getRawValue() as LoginFormValue;

      console.log('Login attempt:', {
        username: formValue.username,
        rememberDevice: formValue.rememberDevice
      });

      localStorage.setItem('token', 'mock-token');
      this.router.navigate(['/home']);
    } else {
      this.markFormGroupTouched();
    }
  }

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }
}
