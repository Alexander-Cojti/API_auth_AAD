

export default {
  // clientId: '1bb75489-fee0-4922-89e8-b06b8858e623',
  clientId:process.env.REACT_APP_CLIENTE,
  // tenant: 'ec84f7ea-569d-44ba-b26e-3523559f73c3',
  tenant:process.env.REACT_APP_TENANT,
  endpoints: {
    // api: "e7ac2945-1c02-42ab-9676-2a012f320f8a"
    api:process.env.REACT_APP_API
    // Necessary for CORS requests, for more info see https://github.com/AzureAD/azure-activedirectory-library-for-js/wiki/CORS-usage
  },
 
  // 'tenant' is the Azure AD instance.
  // 'cacheLocation' is set to 'sessionStorage' by default (see https://github.com/AzureAD/azure-activedirectory-library-for-js/wiki/Config-authentication-context#configurable-options.
  // We change it to'localStorage' because 'sessionStorage' does not work when our app is served on 'localhost' in development.
  cacheLocation: 'localStorage'
}