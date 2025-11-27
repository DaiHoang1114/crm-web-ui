import { FormControl } from '@angular/forms';

export interface UserProfile {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
}

export interface UserProfileControl {
  username: FormControl<string>;
  email: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
}
