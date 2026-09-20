export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'fb1ee838-e24b-4dc8-904b-5f8e13e21828',
      authority: 'https://login.microsoftonline.com/391cd481-8860-4baf-b334-f1720e604b50',
      redirectUri: 'http://localhost:4200'
    }
  },
  apiConfig: {
    scopes: ['api://f6c6a292-0ca4-48c1-aff9-133d0f76a624/OT.Create'],
    uri: 'https://motbxxb267.execute-api.us-east-1.amazonaws.com'
  }
};
