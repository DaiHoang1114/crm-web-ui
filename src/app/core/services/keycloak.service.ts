import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {
  private keycloak!: Keycloak;
  private initialized = false;
  private mockMode = !environment.useKeycloak;

  constructor() {
    if (!this.mockMode) {
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

    try {
      console.log('🔐 Initializing Keycloak...');
      console.log('Realm:', environment.keycloak.realm);
      console.log('Client ID:', environment.keycloak.clientId);
      console.log('URL:', environment.keycloak.url);

      // Set a timeout to prevent infinite loading
      const initPromise = this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframe: false,
        pkceMethod: 'S256',
        enableLogging: true,
        flow: 'standard'
      });

      // Add timeout
      const timeoutPromise = new Promise<boolean>((_, reject) => {
        setTimeout(() => reject(new Error('Keycloak initialization timeout')), 10000);
      });

      this.initialized = await Promise.race([initPromise, timeoutPromise]);

      console.log('✅ Keycloak initialized successfully');
      console.log('Authenticated:', this.keycloak.authenticated);

      if (this.keycloak.authenticated) {
        console.log('✅ User:', this.keycloak.tokenParsed?.['preferred_username']);
      } else {
        console.log('ℹ️ User not authenticated - SSO check complete');
      }

      return this.initialized;
    } catch (error) {
      console.error('❌ Failed to initialize Keycloak', error);
      console.error('Check:');
      console.error('1. Realm exists:', `${environment.keycloak.url}/realms/${environment.keycloak.realm}`);
      console.error('2. Client exists with ID:', environment.keycloak.clientId);
      console.error('3. CORS configured for http://localhost:4200');
      throw error;
    }
  }

  getToken(): string {
    if (this.mockMode) return 'mock-jwt-token';
    return this.keycloak.token ?? '';
  }

  isLoggedIn(): boolean {
    if (this.mockMode) return true;
    return this.keycloak.authenticated || false;
  }

  login(options?: Keycloak.KeycloakLoginOptions): Promise<void> {
    if (this.mockMode) {
      console.log('🔧 Mock login');
      return Promise.resolve();
    }
    return this.keycloak.login(options);
  }

  logout(redirectUri?: string): Promise<void> {
    if (this.mockMode) {
      console.log('🔧 Mock logout');
      return Promise.resolve();
    }
    return this.keycloak.logout({ redirectUri });
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
    return this.keycloak.loadUserProfile();
  }

  getUsername(): string {
    if (this.mockMode) return 'demo-user';
    return this.keycloak.tokenParsed?.['preferred_username'] || '';
  }

  isUserInRole(role: string): boolean {
    if (this.mockMode) return true;
    return this.keycloak.hasRealmRole(role);
  }

  getUserRoles(): string[] {
    if (this.mockMode) return ['user', 'admin', 'analyst'];
    return this.keycloak.realmAccess?.roles || [];
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
    return this.keycloak.tokenParsed;
  }
}
