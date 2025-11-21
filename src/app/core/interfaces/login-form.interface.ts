import { FormControl } from '@angular/forms';

export interface LoginFormControls {
  username: FormControl<string>;
  password: FormControl<string>;
  rememberDevice: FormControl<boolean | null>;
}

export interface LoginFormValue {
  username: string;
  password: string;
  rememberDevice: boolean | null;
}

export interface LoginRequest {
  username: string;
  password: string;
  rememberDevice?: boolean;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email?: string;
  };
}
