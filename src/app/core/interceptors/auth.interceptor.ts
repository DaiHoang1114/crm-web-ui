import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakAuthService } from '../services/keycloak.service';
import { from, switchMap, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakAuthService);

  // Skip token for excluded URLs
  const excludedUrls = ['/assets', '/clients/public'];
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  // Add token if authenticated
  const keycloak = keycloakService.getKeycloakInstance();

  // Check if keycloak is null (mock mode)
  if (!keycloak) {
    // In mock mode, add a mock token
    const mockReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer mock-jwt-token'
      }
    });
    return next(mockReq);
  }

  // Real Keycloak mode
  if (keycloak.authenticated && keycloak.token) {
    // Update token if needed (5 seconds validity)
    return from(keycloakService.updateToken(5)).pipe(
      switchMap(() => {
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${keycloak.token}`
          }
        });
        return next(clonedReq);
      })
    );
  }

  return next(req);
};
