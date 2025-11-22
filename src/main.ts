import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js'; // 👈 Add this import at the top
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { KeycloakAuthService } from './app/core/services/keycloak.service';

// Get Keycloak service instance
const keycloakService = new KeycloakAuthService();

// Initialize Keycloak first
keycloakService
  .init()
  .then(() => {
    console.log('🚀 Starting CRM Web UI...');
    // Bootstrap Angular app after Keycloak is initialized
    bootstrapApplication(App, appConfig).catch((err) =>
      console.error('❌ Angular bootstrap error:', err)
    );
  })
  .catch((error) => {
    console.error('❌ Keycloak initialization error:', error);
    console.log('⚠️  Continuing without Keycloak authentication...');

    // Bootstrap anyway for development
    bootstrapApplication(App, appConfig).catch((err) =>
      console.error('❌ Angular bootstrap error:', err)
    );
  });
