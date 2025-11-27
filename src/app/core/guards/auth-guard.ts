import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { KeycloakAuthService } from '../services/keycloak.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const keycloak = inject(KeycloakAuthService);
  const router = inject(Router);

  try {
    const isLoggedIn = keycloak.isLoggedIn();

    // If not logged in, redirect to Keycloak login page
    if (!isLoggedIn) {
      console.log('⚠️ User not authenticated, redirecting to Keycloak login...');

      // This will cause a page redirect, so we don't need to await it
      keycloak.login({
        redirectUri: window.location.origin + state.url,
      }).catch(error => {
        console.error('❌ Login redirect failed:', error);
      });

      // Return false to stop navigation
      return false;
    }

    // Check for required roles if specified in route data
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.some(role => keycloak.isUserInRole(role));

      if (!hasRole) {
        console.log('⚠️ User lacks required roles:', requiredRoles);
        router.navigate(['/unauthorized']);
        return false;
      }
    }

    console.log('✅ User authenticated and authorized');
    return true;
  } catch (error) {
    console.error('❌ Auth guard error:', error);
    return false;
  }
};
