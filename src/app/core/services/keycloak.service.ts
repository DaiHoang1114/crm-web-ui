import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {
  private keycloak: Keycloak | null = null;
  private initialized = false;
  private mockMode = !environment.useKeycloak;

  constructor(private readonly http: HttpClient) {
    if (!this.mockMode) {
      console.log('Creating Keycloak instance with config:', environment.keycloak);
      this.keycloak = new Keycloak(environment.keycloak);
    }
  }

  async init(): Promise<boolean> {
    if (this.initialized) {
      return Promise.resolve(true);
    }

    // Mock mode for development
    if (this.mockMode) {
      console.log('🔧 Running in MOCK authentication mode');
      this.initialized = true;
      return true;
    }

    if (!this.keycloak) {
      throw new Error('Keycloak instance not created');
    }

    try {
      console.log('🔐 Initializing Keycloak...');
      console.log('URL:', environment.keycloak.url);
      console.log('Realm:', environment.keycloak.realm);
      console.log('Client ID:', environment.keycloak.clientId);

      this.initialized = await this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframe: false,
        pkceMethod: 'S256',
        enableLogging: true,
        silentCheckSsoFallback: false,
      });

      console.log('✅ Keycloak initialized successfully');
      console.log('Authenticated:', this.keycloak.authenticated);

      if (this.keycloak.authenticated) {
        console.log('✅ User authenticated:', this.keycloak.tokenParsed?.['preferred_username']);
      } else {
        console.log('ℹ️ User not authenticated - SSO check complete');
      }

      return this.initialized;
    } catch (error) {
      console.error('❌ Failed to initialize Keycloak', error);
      throw error;
    }
  }

  getToken(): string {
    if (this.mockMode) return 'mock-jwt-token';
    return this.keycloak?.token ?? '';
  }

  isLoggedIn(): boolean {
    if (this.mockMode) return true;
    return this.keycloak?.authenticated || false;
  }

  login(options?: Keycloak.KeycloakLoginOptions): Promise<void> {
    if (this.mockMode) {
      console.log('🔧 Mock login');
      return Promise.resolve();
    }

    // Check if keycloak is initialized
    if (!this.keycloak) {
      console.error('❌ Keycloak not initialized!');
      return Promise.reject(new Error('Keycloak not initialized'));
    }

    console.log('🔐 Redirecting to Keycloak login...', options);

    // The login method doesn't return a promise in the traditional sense
    // It redirects the browser, so we wrap it
    try {
      this.keycloak.login(options);
      // Return a promise that never resolves because we're redirecting
      return new Promise(() => {});
    } catch (error) {
      console.error('❌ Login error:', error);
      return Promise.reject(error);
    }
  }

  logout(redirectUri?: string): Promise<void> {
    if (this.mockMode) {
      console.log('🔧 Mock logout');
      return Promise.resolve();
    }

    if (!this.keycloak) {
      return Promise.reject(new Error('Keycloak not initialized'));
    }

    try {
      this.keycloak.logout({ redirectUri });
      return new Promise(() => {});
    } catch (error) {
      return Promise.reject(error);
    }
  }

  loadUserProfile(): Promise<Keycloak.KeycloakProfile> {
    if (this.mockMode) {
      return Promise.resolve({
        username: 'demo-user',
        email: 'demo@crm-web-ui.com',
        firstName: 'Demo',
        lastName: 'User',
        emailVerified: true,
      });
    }

    if (!this.keycloak) {
      return Promise.reject(new Error('Keycloak not initialized'));
    }

    return this.keycloak.loadUserProfile();
  }

  updateUserProfile(firstName: string, lastName: string): Observable<void> {
    const request : {
      firstName?: string;
      lastName?: string;
    } = {
      firstName,
      lastName
    }

    return this.http.put<void>(`${environment.crm.url}/api/user/profile`, request);
  }

  getUsername(): string {
    if (this.mockMode) return 'demo-user';
    return this.keycloak?.tokenParsed?.['preferred_username'] || '';
  }

  isUserInRole(role: string): boolean {
    if (this.mockMode) return true;
    return this.keycloak?.hasRealmRole(role) || false;
  }

  getUserRoles(): string[] {
    if (this.mockMode) return ['user', 'admin', 'analyst'];
    return this.keycloak?.realmAccess?.roles || [];
  }

  hasAnyRole(roles: string[]): boolean {
    if (this.mockMode) return true;
    return roles.some(role => this.isUserInRole(role));
  }

  hasAllRoles(roles: string[]): boolean {
    if (this.mockMode) return true;
    return roles.every(role => this.isUserInRole(role));
  }

  updateToken(minValidity: number = 5): Promise<boolean> {
    if (this.mockMode) return Promise.resolve(true);

    if (!this.keycloak) {
      return Promise.reject(new Error('Keycloak not initialized'));
    }

    return this.keycloak.updateToken(minValidity);
  }

  getKeycloakInstance(): Keycloak | null {
    if (this.mockMode) return null;
    return this.keycloak;
  }

  getTokenParsed(): Keycloak.KeycloakTokenParsed | undefined {
    if (this.mockMode) {
      return {
        preferred_username: 'demo-user',
        email: 'demo@crm-web-ui.com',
        name: 'Demo User',
        given_name: 'Demo',
        family_name: 'User',
      } as any;
    }
    return this.keycloak?.tokenParsed;
  }
}
