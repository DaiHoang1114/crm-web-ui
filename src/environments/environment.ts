export const environment = {
  production: false,
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'master',
    clientId: 'crm-web-ui',
  },
  crm: {
    url: 'http://localhost:5062'
  },
  useKeycloak: true
};
