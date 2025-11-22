import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { KeycloakAuthService } from '../services/keycloak.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const keycloak = inject(KeycloakAuthService);
  const router = inject(Router);

  try {
    const isLoggedIn = keycloak.isLoggedIn();

    if (!isLoggedIn) {
      await keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
      return false;
    }

    // Check for required roles if specified in route data
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.some(role => keycloak.isUserInRole(role));

      if (!hasRole) {
        router.navigate(['/unauthorized']);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Auth guard error:', error);
    router.navigate(['/error']);
    return false;
  }
};
