import { inject, Injectable } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { from, Observable } from 'rxjs';
import { KeycloakAuthService } from './keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly keycloak = inject(KeycloakAuthService);

  getUserProfile(): Observable<KeycloakProfile> {
    return from(this.keycloak.loadUserProfile());
  }

  getUsername(): string {
    return this.keycloak.getUsername();
  }

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  login(redirectUri?: string): Observable<void> {
    return from(this.keycloak.login({ redirectUri }));
  }

  logout(redirectUri?: string): Observable<void> {
    return from(this.keycloak.logout(redirectUri || window.location.origin));
  }

  getToken(): string {
    return this.keycloak.getToken();
  }

  getTokenParsed(): any {
    const instance = this.keycloak.getKeycloakInstance();
    return instance?.tokenParsed;
  }

  isUserInRole(role: string): boolean {
    return this.keycloak.isUserInRole(role);
  }

  getUserRoles(): string[] {
    return this.keycloak.getUserRoles();
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.isUserInRole(role));
  }

  hasAllRoles(roles: string[]): boolean {
    return roles.every(role => this.isUserInRole(role));
  }

  async updateToken(minValidity: number = 5): Promise<boolean> {
    return this.keycloak.updateToken(minValidity);
  }

  getKeycloakInstance() {
    return this.keycloak.getKeycloakInstance();
  }

  updateUserProfile(firstName: string, lastName: string): Observable<void> {
    return this.keycloak.updateUserProfile(firstName, lastName);
  }
}
