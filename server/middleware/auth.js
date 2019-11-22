import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'

// store in environment variable
export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-8pdh2pwa.auth0.com/.well-known/jwks.json'
  }),
  audience: 'Ta9KLKQMNBiR36bdttXae6wJKQzrhOtS',
  issuer: 'https://dev-8pdh2pwa.auth0.com',
  algorithms: ['RS256']
})
